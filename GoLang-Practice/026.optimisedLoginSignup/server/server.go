package main

import (
	"encoding/json"
	"fmt"
	"net"
	"os"
	"sort"
	"strings"
	"time"
)

var clients = make(map[net.Conn]bool)
var chatData = make(map[string][]map[string]string)
var users = make(map[string]map[string]interface{})

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
			fmt.Printf("Client %s disconnected.\n", clientAddr)
			delete(clients, conn)
			return
		}

		msg := strings.TrimSpace(string(message[:n]))
		if strings.HasPrefix(msg, "/signup") {
			// Process signup
			parts := strings.SplitN(msg, ":", 6) // Change 4 to 6 to match the number of parts
			fmt.Println(parts)
			if len(parts) != 6 { // Change 4 to 6 here as well
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
			// Retrieve all chat history
			parts := strings.SplitN(msg, ":", 2)
			fmt.Println(parts)
			if len(parts) != 2 {
				fmt.Println("Invalid username format")
				continue
			}
			username := parts[1]
			sendAllChatHistoryByUser(conn, username)

		} else if strings.HasPrefix(msg, "/login") {
			// Process login
			parts := strings.SplitN(msg, ":", 3)
			if len(parts) != 3 {
				fmt.Println("Invalid login format")
				continue
			}
			username := parts[1]
			password := parts[2]
			if login(username, password) {
				fmt.Fprintln(conn, "Login successful.")
			} else {
				fmt.Fprintln(conn, "Login failed. Please check your username and password or signup if you don't have an account.")
			}
		} else if strings.HasPrefix(msg, "/retrieveUserInformation") {
			// Retrieve UserInformation
			parts := strings.SplitN(msg, ":", 2)
			fmt.Println(parts)
			if len(parts) != 2 {
				fmt.Println("Invalid username format")
				continue
			}
			username := parts[1]
			retrieveUserInfo(conn, username)

		} else {
			// Handle regular chat messages
			parts := strings.SplitN(msg, ":", 2)
			if len(parts) != 2 {
				fmt.Println("Invalid message format")
				continue
			}
			username := parts[0]
			messageText := parts[1]
			timestampedMsg := fmt.Sprintf("[%s] %s: %s", time.Now().Format(time.RFC3339), username, messageText)
			// Save to saveChat.json
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

	// Get the current date and time
	signupDateTime := time.Now().Format(time.RFC3339)

	// Save the user data
	userData := map[string]interface{}{
		"fullname":       fullname,
		"password":       password,
		"bio":            bio,
		"role":           role,
		"signupDateTime": signupDateTime, // Add signup date and time
	}
	users[username] = userData

	saveUserData() // Save user data to the file
	return true
}

func login(username, password string) bool {
	// Check if the username exists and the password is correct
	if userData, exists := users[username]; exists {
		if storedPassword, ok := userData["password"].(string); ok && storedPassword == password {
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

func getUsernameByConn(conn net.Conn) string {
	// Find the username associated with the connection
	for username, userChats := range chatData {
		for _, userChat := range userChats {
			if userChat["ipAddress"] == conn.RemoteAddr().String() {
				return username
			}
		}
	}
	return ""
}

func sendAllChatHistory(conn net.Conn) {
	// Open and read the JSON file
	file, err := os.Open("saveChat.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// Decode the JSON data
	var chatsByUser ChatsByUser
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&chatsByUser); err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	// Print the sorted chat messages in the desired format
	for username, chats := range chatsByUser {
		// Sort the chat messages for each user by time
		sort.Slice(chats, func(i, j int) bool {
			return chats[i].Time.Before(chats[j].Time)
		})

		// Print the sorted chat messages
		for _, chat := range chats {
			formattedMessage := fmt.Sprintf("[%s] %s :: %s\n", chat.Time, username, chat.Message)
			fmt.Fprint(conn, formattedMessage) // Send the formatted message to the client
		}
	}
}
func sendAllChatHistoryByUser(conn net.Conn, clientUserName string) {
	// Open and read the JSON file
	file, err := os.Open("saveChat.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// Decode the JSON data
	var chatsByUser ChatsByUser
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&chatsByUser); err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	// Print the sorted chat messages in the desired format
	for username, chats := range chatsByUser {
		// Sort the chat messages for each user by time
		sort.Slice(chats, func(i, j int) bool {
			return chats[i].Time.Before(chats[j].Time)
		})

		if clientUserName == username {
			// Print the sorted chat messages
			for _, chat := range chats {
				formattedMessage := fmt.Sprintf("[%s] %s :: %s\n", chat.Time, username, chat.Message)
				fmt.Fprint(conn, formattedMessage) // Send the formatted message to the client
			}
		}
	}
}
func retrieveUserInfo(conn net.Conn, username string) {
	fmt.Println("trying to retrieve userinfo")
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
		// User not found
		fmt.Fprintln(conn, "User not found.")
		return
	}

	userInfoJSON, err := json.Marshal(userInfo)
	if err != nil {
		fmt.Println("Error encoding user info:", err)
		return
	}

	// Send the user info to the client
	fmt.Fprintln(conn, string(userInfoJSON))
}
