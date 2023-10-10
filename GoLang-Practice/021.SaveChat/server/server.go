package main

import (
	"fmt"
	"net"
	"os"
	"strings"
	"time"
)

var clients = make(map[net.Conn]bool)

func main() {
	port := "8080"
	listener, err := net.Listen("tcp", ":"+port)  //Server creation on port 8080
	if err != nil {
		panic(err)
	}
	defer listener.Close()
	fmt.Printf("Chat server running on port %s...\n", port)

	for {
		conn, err := listener.Accept() // accepting clients
		if err != nil {
			fmt.Println(err)
			continue
		}
		clients[conn] = true // storing connections in clients slice
		go handleClient(conn) // handling multiple clients
	}
}

func handleClient(conn net.Conn) {
	defer conn.Close()

	clientAddr := conn.RemoteAddr().String() // storing client address in clientAddr variable
	fmt.Printf("Client %s connected.\n", clientAddr)

	file, err := os.OpenFile("saveChat.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("Could not open saveChat.txt")
		return
	}
	defer file.Close()

	_, err2 := file.WriteString(fmt.Sprintf("[%s] Client %s connected.\n", time.Now().Format(time.RFC3339), clientAddr)) // writing 
	if err2 != nil {
		fmt.Println("Could not write text to saveChat.txt")
	} else {
		fmt.Println("Operation successful! Text has been appended to saveChat.txt")
	}

	for {
		message := make([]byte, 1024)
		n, err := conn.Read(message)
		if err != nil {
			fmt.Printf("Client %s disconnected.\n", clientAddr)
			_, err := file.WriteString(fmt.Sprintf("[%s] Client %s disconnected.\n", time.Now().Format(time.RFC3339), clientAddr))
			if err != nil {
				fmt.Println("Could not write text to saveChat.txt")
			}
			delete(clients, conn)
			return
		}
		msg := strings.TrimSpace(string(message[:n]))
		timestampedMsg := fmt.Sprintf("[%s] %s: %s\n", time.Now().Format(time.RFC3339), clientAddr, msg)
		fmt.Print(timestampedMsg)
		_, err = file.WriteString(timestampedMsg)
		if err != nil {
			fmt.Println("Could not write text to saveChat.txt")
		}
		broadcast(msg)
	}
}

func broadcast(message string) {
	for conn := range clients {
		_, err := conn.Write([]byte(message))
		if err != nil {
			fmt.Println(err)
			conn.Close()
			delete(clients, conn)
		}
	}
}
