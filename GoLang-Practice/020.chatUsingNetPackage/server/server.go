// Server
package main

import (
	"fmt"
	"net"
	"strings"
)

var clients = make(map[net.Conn]bool)
var messages = make(chan string)

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
		clients[conn] = true
		go handleClient(conn)
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
		fmt.Printf("%s: %s\n", clientAddr, msg)
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