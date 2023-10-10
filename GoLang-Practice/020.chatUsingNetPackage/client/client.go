package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"os"
	"strings"
)

func main() {
	serverAddr := "localhost:8080"

	conn, err := net.Dial("tcp", serverAddr)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	fmt.Print("Enter your username: ")
	username, _ := bufio.NewReader(os.Stdin).ReadString('\n')
	username = strings.TrimSpace(username)

	go receiveMessages(conn)

	for {
		message, _ := bufio.NewReader(os.Stdin).ReadString('\n')
		message = strings.TrimSpace(message)

		if message == "/exit" {
			return
		}

		msg := username + ": " + message
		_, err := conn.Write([]byte(msg))
		if err != nil {
			log.Fatal(err)
		}
	}
}

func receiveMessages(conn net.Conn) {
	for {
		message := make([]byte, 1024)
		n, err := conn.Read(message)
		if err != nil {
			panic(err)
		}
		fmt.Println(string(message[:n]))
	}
}
