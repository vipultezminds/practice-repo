package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/gorilla/websocket"
)

func main() {
	serverAddr := "ws://localhost:8080/ws"
	fmt.Print("Enter your username: ")
	username, _ := bufio.NewReader(os.Stdin).ReadString('\n')
	username = strings.TrimSpace(username)

	conn, _, err := websocket.DefaultDialer.Dial(serverAddr, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	go func() {
		for {
			var msg Message
			err := conn.ReadJSON(&msg)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Printf("%s: %s\n", msg.Username, msg.Message)
		}
	}()

	for {
		// fmt.Print("Enter message: ")
		message, _ := bufio.NewReader(os.Stdin).ReadString('\n')
		message = strings.TrimSpace(message)

		if message == "/exit" {
			return
		}

		msg := Message{Username: username, Message: message}
		err := conn.WriteJSON(msg)
		if err != nil {
			log.Fatal(err)
		}
	}
}

type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}
