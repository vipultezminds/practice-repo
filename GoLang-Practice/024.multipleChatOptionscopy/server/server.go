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

// func main() {
// 	port := "8080"
// 	listener, err := net.Listen("tcp", ":"+port)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer listener.Close()
// 	fmt.Printf("Chat server running on port %s...\n", port)

// 	for {
// 		conn, err := listener.Accept()
// 		if err != nil {
// 			fmt.Println(err)
// 			continue
// 		}
// 		clients[conn] = true // Register the client

// 		go handleClient(conn)
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
// 		parts := strings.SplitN(msg, ":", 2)
// 		if len(parts) != 2 {
// 			fmt.Println("Invalid message format")
// 			continue
// 		}

// 		username := parts[0]
// 		messageText := parts[1]

// 		timestampedMsg := fmt.Sprintf("[%s] %s: %s", time.Now().Format(time.RFC3339), username, messageText)

// 		// Save to saveChat.json
// 		saveToJSON(username, messageText)

// 		broadcast(timestampedMsg)
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

// 	saveChatHistory(chatData)
// }

// func saveChatHistory(chatData map[string][]map[string]string) {
// 	file, err := os.Create("saveChat.json")
// 	if err != nil {
// 		fmt.Println("Could not create saveChat.json:", err)
// 		return
// 	}
// 	defer file.Close()
// 	fmt.Println(chatData)
// 	encoder := json.NewEncoder(file)
// 	if err := encoder.Encode(chatData); err != nil {
// 		fmt.Println("Error encoding saveChat.json:", err)
// 	} else {
// 		fmt.Println("Chat history saved successfully.")
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

func main() {
	port := "8080"
	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		panic(err)
	}
	defer listener.Close()
	fmt.Printf("Chat server running on port %s...\n", port)

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
