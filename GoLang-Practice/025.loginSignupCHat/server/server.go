// // server.go

// package main

// import (
// 	"encoding/json"
// 	"fmt"
// 	"net"
// 	"os"
// 	"strings"
// 	"time"
// )

// var clients = make(map[net.Conn]bool)
// var chatData = make(map[string][]map[string]string)
// var users = make(map[string]string)

// func main() {
// 	port := "8080"
// 	listener, err := net.Listen("tcp", ":"+port)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer listener.Close()
// 	fmt.Printf("Chat server running on port %s...\n", port)

// 	// Load user data from file
// 	loadUserData()

// 	for {
// 		conn, err := listener.Accept()
// 		if err != nil {
// 			fmt.Println(err)
// 			continue
// 		}
// 		clients[conn] = true // Register the client

// 		// Load chat history for the new client
// 		loadChatHistory()

// 		go handleClient(conn)
// 	}
// }

// func loadUserData() {
// 	file, err := os.Open("userData.json")
// 	if err != nil {
// 		fmt.Println("Could not open userData.json")
// 		return
// 	}
// 	defer file.Close()

// 	decoder := json.NewDecoder(file)
// 	if err := decoder.Decode(&users); err != nil {
// 		fmt.Println("Error decoding userData.json:", err)
// 	}
// }

// func handleClient(conn net.Conn) {
// 	defer conn.Close()

// 	clientAddr := conn.RemoteAddr().String()
// 	fmt.Printf("Client %s connected.\n", clientAddr)

// 	for {
// 		message := make([]byte, 1024)
// 		n, err := conn.Read(message)
// 		if err != nil {
// 			fmt.Printf("Client %s disconnected.\n", clientAddr)
// 			delete(clients, conn)
// 			return
// 		}

// 		msg := strings.TrimSpace(string(message[:n]))
// 		if strings.HasPrefix(msg, "/signup") {
// 			// Process signup
// 			parts := strings.SplitN(msg, ":", 3)
// 			if len(parts) != 3 {
// 				fmt.Println("Invalid signup format")
// 				continue
// 			}
// 			username := parts[1]
// 			password := parts[2]
// 			if signup(username, password) {
// 				fmt.Fprintln(conn, "Signup successful. You can now login.")
// 			} else {
// 				fmt.Fprintln(conn, "Username already exists. Please login or choose a different username.")
// 			}
// 		} else if strings.HasPrefix(msg, "/login") {
// 			// Process login
// 			parts := strings.SplitN(msg, ":", 3)
// 			if len(parts) != 3 {
// 				fmt.Println("Invalid login format")
// 				continue
// 			}
// 			username := parts[1]
// 			password := parts[2]
// 			if login(username, password) {
// 				fmt.Fprintln(conn, "Login successful.")
// 			} else {
// 				fmt.Fprintln(conn, "Login failed. Please check your username and password or signup if you don't have an account.")
// 			}
// 		} else {
// 			// Handle regular chat messages
// 			parts := strings.SplitN(msg, ":", 2)
// 			fmt.Println(parts)
// 			if len(parts) != 2 {
// 				fmt.Println("Invalid message format")
// 				continue
// 			}
// 			username := parts[0]
// 			messageText := parts[1]
// 			timestampedMsg := fmt.Sprintf("[%s] %s: %s", time.Now().Format(time.RFC3339), username, messageText)
// 			// Save to saveChat.json
// 			saveToJSON(username, messageText)
// 			broadcast(timestampedMsg)
// 		}
// 	}
// }

// func signup(username, password string) bool {
// 	// Check if the username already exists
// 	if _, exists := users[username]; exists {
// 		return false
// 	}
// 	// Save the user data
// 	users[username] = password
// 	saveUserData()
// 	return true
// }

// func login(username, password string) bool {
// 	// Check if the username exists and the password is correct
// 	if storedPassword, exists := users[username]; exists && storedPassword == password {
// 		return true
// 	}
// 	return false
// }

// func saveUserData() {
// 	file, err := os.Create("userData.json")
// 	if err != nil {
// 		fmt.Println("Could not create userData.json")
// 		return
// 	}
// 	defer file.Close()

// 	encoder := json.NewEncoder(file)
// 	if err := encoder.Encode(users); err != nil {
// 		fmt.Println("Error encoding userData.json:", err)
// 	}
// }

// func saveToJSON(username, message string) {
// 	if _, exists := chatData[username]; !exists {
// 		chatData[username] = []map[string]string{}
// 	}
// 	chatData[username] = append(chatData[username], map[string]string{
// 		"time":    time.Now().Format(time.RFC3339),
// 		"message": message,
// 	})

// 	go saveChatHistory()
// }

// func saveChatHistory() {
// 	file, err := os.Create("saveChat.json")
// 	if err != nil {
// 		fmt.Println("Could not create saveChat.json")
// 		return
// 	}
// 	defer file.Close()

// 	encoder := json.NewEncoder(file)
// 	if err := encoder.Encode(chatData); err != nil {
// 		fmt.Println("Error encoding saveChat.json:", err)
// 	}
// }

// func broadcast(message string) {
// 	fmt.Println(message)
// 	for conn := range clients {
// 		_, err := conn.Write([]byte(message + "\n"))
// 		if err != nil {
// 			fmt.Println(err)
// 			conn.Close()
// 			delete(clients, conn)
// 		}
// 	}
// }
// func loadChatHistory() {
// 	file, err := os.Open("saveChat.json")
// 	if err != nil {
// 		fmt.Println("Could not open saveChat.json")
// 		return
// 	}
// 	defer file.Close()

// 	decoder := json.NewDecoder(file)
// 	if err := decoder.Decode(&chatData); err != nil {
// 		fmt.Println("Error decoding saveChat.json:", err)
// 	}
// }


package main

import (
	"encoding/json"
	"fmt"
	"net"
	"os"
	"strings"
	"time"
)

var clients = make(map[net.Conn]bool)
var chatData = make(map[string][]map[string]string)
var users = make(map[string]string)

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
			parts := strings.SplitN(msg, ":", 3)
			if len(parts) != 3 {
				fmt.Println("Invalid signup format")
				continue
			}
			username := parts[1]
			password := parts[2]
			if signup(username, password) {
				fmt.Fprintln(conn, "Signup successful. You can now login.")
			} else {
				fmt.Fprintln(conn, "Username already exists. Please login or choose a different username.")
			}
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
			saveToJSON(username, messageText)
			broadcast(timestampedMsg)
		}
	}
}

func signup(username, password string) bool {
	// Check if the username already exists
	if _, exists := users[username]; exists {
		return false
	}
	// Save the user data
	users[username] = password
	saveUserData()
	return true
}

func login(username, password string) bool {
	// Check if the username exists and the password is correct
	if storedPassword, exists := users[username]; exists && storedPassword == password {
		return true
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

func saveToJSON(username, message string) {
	if _, exists := chatData[username]; !exists {
		chatData[username] = []map[string]string{}
	}
	chatData[username] = append(chatData[username], map[string]string{
		"time":    time.Now().Format(time.RFC3339),
		"message": message,
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
