package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {
	fmt.Println("Chat client started.")

	// Connect to the server
	conn, err := net.Dial("tcp", "localhost:8080") // Replace with the server's address
	if err != nil {
		fmt.Println("Error connecting to the server:", err)
		os.Exit(1)
	}
	defer conn.Close()

	// Ask the user for a username
	fmt.Print("Enter your username: ")
	username, _ := bufio.NewReader(os.Stdin).ReadString('\n')
	username = username[:len(username)-1] // Remove the newline character

	// Start a goroutine to read messages from the server
	go readMessages(conn)

	// Read and send user input to the server
	for {
		reader := bufio.NewReader(os.Stdin) // Declare reader here
		message, _ := reader.ReadString('\n')
		message = message[:len(message)-1] // Remove the newline character
		fullMessage := username + ": " + message
		fmt.Fprint(conn, fullMessage+"\n")
	}
}

func readMessages(conn net.Conn) {
	for {
		message, err := bufio.NewReader(conn).ReadString('\n')
		if err != nil {
			fmt.Println("Connection to the server has been closed.")
			os.Exit(1)
		}
		fmt.Print(message)
	}
}
