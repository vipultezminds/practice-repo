package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func main() {
	conn, err := net.Dial("tcp", "localhost:8080")
	if err != nil {
		fmt.Println("Error connecting to the server:", err)
		return
	}
	defer conn.Close()

	fmt.Print("Enter your username: ")
	username := readInput()
	fmt.Print("Enter the room number: ")
	roomNumber := readInput()

	conn.Write([]byte(username + "\n" + roomNumber + "\n"))

	go receiveMessages(conn)

	for {
		message := readInput()
		_, err := conn.Write([]byte(message + "\n"))
		if err != nil {
			fmt.Println("Error sending message:", err)
			return
		}

		if strings.ToLower(message) == "/exit" {
			break
		}
	}
}

func receiveMessages(conn net.Conn) {
	reader := bufio.NewReader(conn)
	for {
		message, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("Error receiving message:", err)
			return
		}
		fmt.Print(message)
	}
}

func readInput() string {
	scanner := bufio.NewScanner(os.Stdin)
	if scanner.Scan() {
		return scanner.Text()
	}
	return ""
}
