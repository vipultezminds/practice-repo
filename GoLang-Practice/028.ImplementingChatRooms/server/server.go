package main

import (
	"encoding/json"
	"fmt"
	"net"
	"os"
	"sort"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

var clients = make(map[net.Conn]bool)
var chatData = make(map[string][]map[string]string)
var users = make(map[string]map[string]interface{})
var connToUsername = make(map[net.Conn]string)

type Chat struct {
	IPAddress string    `json:"ipAddress"`
	Message   string    `json:"message"`
	Time      time.Time `json:"time"`
}

type ChatsByUser map[string][]Chat

func main() {
	port := "8080"
	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		panic(err)
	}
	defer listener.Close()
	fmt.Printf("Chat server running on port %s...\n", port)

	// Load user data from file
	loadUserData()

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println(err)
			continue
		}
		clients[conn] = true // Register the client

		// Load chat history for the new client
		loadChatHistory()

		go handleClient(conn)
	}
}

func loadUserData() {
	file, err := os.Open("userData.json")
	if err != nil {
		fmt.Println("Could not open userData.json")
		return
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&users); err != nil {
		fmt.Println("Error decoding userData.json:", err)
	}
}

func handleClient(conn net.Conn) {
	defer conn.Close()

	clientAddr := conn.RemoteAddr().String()
	fmt.Printf("Client %s connected.\n", clientAddr)

	for {
		message := make([]byte, 1024)
		n, err := conn.Read(message)
		if err != nil {
			username, exists := connToUsername[conn]
			if exists {
				fmt.Printf("%s disconnected.\n", username)

				// Update the user's isActive to false and LastSeen to the current time
				userData := users[username]
				userData["isActive"] = false
				userData["LastSeen"] = time.Now().Format(time.RFC3339)
				saveUserData()
				// Remove the client connection from the map
				delete(connToUsername, conn)
			} else {
				fmt.Printf("An unidentified client disconnected.\n")
			}
			fmt.Printf("Client %s disconnected.\n", clientAddr)
			delete(clients, conn)
			return
		}

		msg := strings.TrimSpace(string(message[:n]))
		if strings.HasPrefix(msg, "/signup") {
			// Process signup
			parts := strings.SplitN(msg, ":", 6)
			if len(parts) != 6 {
				fmt.Println("Invalid signup format")
				continue
			}
			username := parts[1]
			password := parts[2]
			fullname := parts[3]
			bio := parts[4]
			role := parts[5]
			if signup(username, password, fullname, bio, role) {
				fmt.Fprintln(conn, "Signup successful. You can now login.")
			} else {
				fmt.Fprintln(conn, "Username already exists. Please login or choose a different username.")
			}
		} else if strings.HasPrefix(msg, "/retrieveAllChat") {
			// Retrieve all chat history
			sendAllChatHistory(conn)
		} else if strings.HasPrefix(msg, "/retrieveUserChat") {
			parts := strings.SplitN(msg, ":", 2)
			if len(parts) != 2 {
				fmt.Println("Invalid username format")
				continue
			}
			username := parts[1]
			sendAllChatHistoryByUser(conn, username)
		} else if strings.HasPrefix(msg, "/login") {
			parts := strings.SplitN(msg, ":", 3)
			if len(parts) != 3 {
				fmt.Println("Invalid login format")
				continue
			}
			username := parts[1]
			password := parts[2]
			if login(username, password) {
				fmt.Fprintln(conn, "Login successful.")
				fmt.Printf("%s is connected with IP %s.\n", username, clientAddr)

				// Store the relation between the connection and the username
				connToUsername[conn] = username
			} else {
				fmt.Fprintln(conn, "Login failed. Please check your username and password or signup if you don't have an account.")
			}
		} else if strings.HasPrefix(msg, "/retrieveUserInformation") {
			parts := strings.SplitN(msg, ":", 2)
			if len(parts) != 2 {
				fmt.Println("Invalid username format")
				continue
			}
			username := parts[1]
			retrieveUserInfo(conn, username)
		} else {
			parts := strings.SplitN(msg, ":", 2)
			if len(parts) != 2 {
				fmt.Println("Invalid message format")
				continue
			}
			username := parts[0]
			messageText := parts[1]
			timestampedMsg := fmt.Sprintf("[%s] %s: %s", time.Now().Format(time.RFC3339), username, messageText)
			saveToJSON(username, messageText, clientAddr)
			broadcast(timestampedMsg)
		}
	}
}

func signup(username, password, fullname, bio, role string) bool {
	// Check if the username already exists
	if _, exists := users[username]; exists {
		return false
	}
	hash, _ := HashPassword(password) 
	// Get the current date and time
	signupDateTime := time.Now().Format(time.RFC3339)

	// Save the user data
	userData := map[string]interface{}{
		"fullname":       fullname,
		"password":       hash,
		"bio":            bio,
		"role":           role,
		"signupDateTime": signupDateTime,
		"isActive":       false, // Added isActive field
		"LastSeen":       "",    // Added LastSeen field
	}
	users[username] = userData

	saveUserData()
	return true
}

// func login(username, password string) bool {
// 	if userData, exists := users[username]; exists {
// 		if storedPassword, ok := userData["password"].(string); ok && storedPassword == password {
// 			userData["isActive"] = true
// 			userData["LastSeen"] = "" // Reset LastSeen
// 			saveUserData()            // Save the updated user data
// 			return true
// 		}
// 	}
// 	return false
// }

func login(username, password string) bool {
	if userData, exists := users[username]; exists {
		if storedPassword, ok := userData["password"].(string); ok && CheckPasswordHash(password, storedPassword) {
			userData["isActive"] = true
			userData["LastSeen"] = "" // Reset LastSeen
			saveUserData() // Save the updated user data
			return true
		}
	}
	return false
}


func saveUserData() {
	file, err := os.Create("userData.json")
	if err != nil {
		fmt.Println("Could not create userData.json")
		return
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	if err := encoder.Encode(users); err != nil {
		fmt.Println("Error encoding userData.json:", err)
	}
}

func saveToJSON(username, message string, clientAddr string) {
	if _, exists := chatData[username]; !exists {
		chatData[username] = []map[string]string{}
	}
	chatData[username] = append(chatData[username], map[string]string{
		"time":      time.Now().Format(time.RFC3339),
		"message":   message,
		"ipAddress": clientAddr,
	})

	go saveChatHistory()
}

func saveChatHistory() {
	file, err := os.Create("saveChat.json")
	if err != nil {
		fmt.Println("Could not create saveChat.json")
		return
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	if err := encoder.Encode(chatData); err != nil {
		fmt.Println("Error encoding saveChat.json:", err)
	}
}

func broadcast(message string) {
	fmt.Println(message)
	for conn := range clients {
		_, err := conn.Write([]byte(message + "\n"))
		if err != nil {
			fmt.Println(err)
			conn.Close()
			delete(clients, conn)
		}
	}
}

func loadChatHistory() {
	file, err := os.Open("saveChat.json")
	if err != nil {
		fmt.Println("Could not open saveChat.json")
		return
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&chatData); err != nil {
		fmt.Println("Error decoding saveChat.json:", err)
	}
}

func retrieveUserInfo(conn net.Conn, username string) {
	// Open and read the JSON file
	file, err := os.Open("userData.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	var userData map[string]interface{}
	if err := decoder.Decode(&userData); err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	userInfo, exists := userData[username]
	if !exists {
		fmt.Fprintln(conn, "User not found.")
		return
	}

	userInfoJSON, err := json.Marshal(userInfo)
	if err != nil {
		fmt.Println("Error encoding user info:", err)
		return
	}

	fmt.Fprintln(conn, string(userInfoJSON))
}

func sendAllChatHistory(conn net.Conn) {
	file, err := os.Open("saveChat.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	var chatsByUser ChatsByUser
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&chatsByUser); err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	for username, chats := range chatsByUser {
		sort.Slice(chats, func(i, j int) bool {
			return chats[i].Time.Before(chats[j].Time)
		})

		for _, chat := range chats {
			formattedMessage := fmt.Sprintf("[%s] %s :: %s\n", chat.Time, username, chat.Message)
			fmt.Fprint(conn, formattedMessage)
		}
	}
}

func sendAllChatHistoryByUser(conn net.Conn, clientUserName string) {
	file, err := os.Open("saveChat.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	var chatsByUser ChatsByUser
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&chatsByUser); err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	for username, chats := range chatsByUser {
		sort.Slice(chats, func(i, j int) bool {
			return chats[i].Time.Before(chats[j].Time)
		})

		if clientUserName == username {
			for _, chat := range chats {
				formattedMessage := fmt.Sprintf("[%s] %s :: %s\n", chat.Time, username, chat.Message)
				fmt.Fprint(conn, formattedMessage)
			}
		}
	}
}
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}