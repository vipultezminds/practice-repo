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
var oneToOneConnections = make(map[string]net.Conn)

type Message struct {
	IPAddress string `json:"ipAddress"`
	Message   string `json:"message"`
	Receiver  string `json:"receiver"`
	Sender    string `json:"sender"`
	Time      string `json:"time"`
}

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

	loadUserData()

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println(err)
			continue
		}
		clients[conn] = true

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

	for {
		message := make([]byte, 1024)
		n, err := conn.Read(message)
		if err != nil {
			username, exists := connToUsername[conn]
			if exists {
				userData := users[username]
				userData["isActive"] = false
				userData["LastSeen"] = time.Now().Format(time.RFC3339)
				saveUserData()
				delete(oneToOneConnections, username)
				delete(connToUsername, conn)
			}
			delete(clients, conn)
			return
		}

		msg := strings.TrimSpace(string(message[:n]))
		if strings.HasPrefix(msg, "/signup") {
			parts := strings.SplitN(msg, ":", 6)
			if len(parts) != 6 {
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
			sendAllChatHistory(conn)
		} else if strings.HasPrefix(msg, "/retrieveUserChat") {
			parts := strings.SplitN(msg, ":", 2)
			if len(parts) != 2 {
				continue
			}
			username := parts[1]
			sendAllChatHistoryByUser(conn, username)
		} else if strings.HasPrefix(msg, "/login") {
			parts := strings.SplitN(msg, ":", 3)
			if len(parts) != 3 {
				continue
			}
			username := parts[1]
			password := parts[2]
			if login(username, password, conn) {
				fmt.Fprintln(conn, "Login successful.")
				connToUsername[conn] = username
				oneToOneConnections[username] = conn
			} else {
				fmt.Fprintln(conn, "Login failed. Please check your username and password or signup if you don't have an account.")
			}

		} else if strings.HasPrefix(msg, "/retrieveUserInformation") {
			parts := strings.SplitN(msg, ":", 2)
			if len(parts) != 2 {
				continue
			}
			username := parts[1]
			retrieveUserInfo(conn, username)
		} else if strings.HasPrefix(msg, "/checkUserOnline") {
			parts := strings.SplitN(msg, ":", 2)
			if len(parts) != 2 {
				continue
			}
			username := parts[1]
			checkUserOnline(conn, username)
		} else if strings.HasPrefix(msg, "Private message to") {
			parts := strings.SplitN(msg, ":", 2)
			if len(parts) != 2 {
				fmt.Fprintln(conn, "Invalid private message format. Use: 'Private message to <username>: <message>'")
				return
			}
			recipientUsername := strings.TrimSpace(parts[0][18:])
			flag := isPresentUser(recipientUsername, conn) // checking if the receiver is present in the database or not
			if flag {
				handlePrivateChat(conn, msg, conn.RemoteAddr().String())
			} else {
				fmt.Fprintln(conn, "User Not Found,,,,,,,")
			}
		} else if strings.HasPrefix(msg, "/loaduserchathistory:") {
			// Load private chat history for the sender and receiver
			fmt.Println("loaduserchathistoryprivate")
			parts := strings.SplitN(msg, ":", 2)
			recipientUsername := parts[1]
			sender := connToUsername[conn]
			loadPrivateChats(sender, recipientUsername, conn)
		} else {
			parts := strings.SplitN(msg, ":", 2)
			if len(parts) != 2 {
				continue
			}
			username := parts[0]
			messageText := parts[1]
			timestampedMsg := fmt.Sprintf("World Chat: [%s] %s: %s", time.Now().Format(time.RFC3339), username, messageText)
			saveToJSON(username, messageText, conn.RemoteAddr().String())
			broadcast(timestampedMsg)
		}
	}
}
func handlePrivateChat(sender net.Conn, message string, clientAddr string) {
	parts := strings.SplitN(message, ":", 2)
	if len(parts) != 2 {
		fmt.Fprintln(sender, "Invalid private message format. Use: 'Private message to <username>: <message>'")
		return
	}
	recipientUsername := strings.TrimSpace(parts[0][18:])
	if isPresentUser(recipientUsername, sender) {
		savePrivateChat(connToUsername[sender], recipientUsername, parts[1], clientAddr, sender)
		recipientConn, exists := oneToOneConnections[recipientUsername]
		if exists {
			privateMessage := fmt.Sprintf("\t\t\t\t\t %s", parts[1])
			fmt.Fprintln(recipientConn, privateMessage)
		}
	} else {
		fmt.Println("User not found")
	}

}

func signup(username, password, fullname, bio, role string) bool {
	// Check if the username already exists
	if _, exists := users[username]; exists {
		return false
	}
	hash, _ := HashPassword(password)
	signupDateTime := time.Now().Format(time.RFC3339)

	userData := map[string]interface{}{
		"fullname":       fullname,
		"password":       hash,
		"bio":            bio,
		"role":           role,
		"signupDateTime": signupDateTime,
		"isActive":       false,
		"LastSeen":       "",
	}
	users[username] = userData

	saveUserData()
	return true
}

func login(username, password string, conn net.Conn) bool {
	if userData, exists := users[username]; exists {
		if storedPassword, ok := userData["password"].(string); ok && CheckPasswordHash(password, storedPassword) {
			userData["isActive"] = true
			userData["LastSeen"] = ""
			saveUserData()

			connToUsername[conn] = username
			oneToOneConnections[username] = conn

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

func savePrivateChat(sender, receiver, message, clientAddr string, conn net.Conn) {
	// Sort the usernames to ensure consistent file naming
	usernames := []string{sender, receiver}
	sort.Strings(usernames)

	filename := fmt.Sprintf("%s_%s_private_chat.json", usernames[0], usernames[1])

	// Declare privateChatData outside of the conditional block
	var privateChatData []map[string]string

	// Check if the file already exists
	if _, err := os.Stat(filename); err != nil {
		// File doesn't exist; create an empty slice to store chat data
		privateChatData = make([]map[string]string, 0)
	} else {
		// Load the existing private chat data
		file, err := os.Open(filename)
		if err != nil {
			fmt.Println("Error opening private chat file:", err)
			return
		}
		defer file.Close()

		decoder := json.NewDecoder(file)
		if err := decoder.Decode(&privateChatData); err != nil {
			fmt.Println("Error decoding private chat file:", err)
			return
		}
	}

	// Create a new private chat message
	chatMessage := map[string]string{
		"time":      time.Now().Format(time.RFC3339),
		"message":   message,
		"sender":    sender,
		"receiver":  receiver,
		"ipAddress": clientAddr,
	}

	// Append the message to the private chat data
	privateChatData = append(privateChatData, chatMessage)

	// Overwrite the private chat file with the updated data
	file, err := os.Create(filename)
	if err != nil {
		fmt.Println("Could not create or overwrite private chat file:", err)
		return
	}
	defer file.Close()

	// Encode and write the updated private chat data as JSON to the file
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(privateChatData); err != nil {
		fmt.Println("Error encoding private chat data:", err)
		return
	}
}

func isPresentUser(username string, conn net.Conn) bool {
	// Open and read the JSON file
	file, err := os.Open("userData.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return false
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	var userData map[string]interface{}
	if err := decoder.Decode(&userData); err != nil {
		fmt.Println("Error decoding JSON:", err)
		return false
	}

	_, exists := userData[username]
	if !exists {
		fmt.Fprintln(conn, "User not found.")
		return false
	} else {
		return true
	}
}

func loadPrivateChats(sender, receiver string, conn net.Conn) {
	// Sort the usernames to ensure consistent file naming
	usernames := []string{sender, receiver}
	sort.Strings(usernames)

	filename := fmt.Sprintf("%s_%s_private_chat.json", usernames[0], usernames[1])

	// Declare privateChatData to store chat history
	var privateChatData []map[string]string

	// Check if the file already exists
	if _, err := os.Stat(filename); err != nil {
		// File doesn't exist; create an empty slice for chat history
		privateChatData = make([]map[string]string, 0)
	} else {
		// Load the existing private chat data
		file, err := os.Open(filename)
		if err != nil {
			fmt.Println("Error opening private chat file:", err)
		}
		defer file.Close()

		decoder := json.NewDecoder(file)
		if err := decoder.Decode(&privateChatData); err != nil {
			fmt.Println("Error decoding private chat file:", err)
		}
	}

	// Iterate through the loaded chat data and format it
	for _, chatMessage := range privateChatData {
		// Format each chat message
		chatTime := chatMessage["time"]
		chatSender := chatMessage["sender"]
		chatMessageText := chatMessage["message"]
		fmt.Fprintf(conn, "[%s] %s: %s\n", chatTime, chatSender, chatMessageText)
		fmt.Printf("[%s] %s: %s\n", chatTime, chatSender, chatMessageText)

	}
}
func checkUserOnline(conn net.Conn, username string) {
	// Open and read the userData.json file
	file, err := os.Open("userData.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		fmt.Fprintln(conn, "Error reading user data.")
		return
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	var userData map[string]map[string]interface{}
	if err := decoder.Decode(&userData); err != nil {
		fmt.Println("Error decoding JSON:", err)
		fmt.Fprintln(conn, "Error reading user data.")
		return
	}

	userInfo, exists := userData[username]
	if !exists {
		fmt.Fprintln(conn, "User not found.")
		return
	}

	isActive, isActiveExists := userInfo["isActive"].(bool)
	lastSeen, lastSeenExists := userInfo["LastSeen"].(string)

	if isActiveExists && isActive {
		fmt.Fprintf(conn, "%s Is Online Now\n",username)
		fmt.Fprintf(conn,">")
	} else {
		if lastSeenExists {
			fmt.Fprintf(conn, "%s's OFFLINE \n(Last seen: %s)\n",username, lastSeen)
		} else {
			fmt.Fprintf(conn, "%s's OFFLINE",username)
		}
	}
}
