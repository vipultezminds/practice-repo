package main

import (
	"bufio"
	"fmt"
	"net"
	"strings"
)

type Client struct {
	conn     net.Conn
	nickname string
	room     *ChatRoom
}

type ChatRoom struct {
	name     string
	clients  map[*Client]struct{}
	messages  chan string
}

var chatRooms = make(map[string]*ChatRoom)

func main() {
	listener, err := net.Listen("tcp", "localhost:8080")
	if err != nil {
		fmt.Println("Error listening:", err)
		return
	}
	defer listener.Close()

	fmt.Println("Chat server is running and listening on localhost:8080")

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error accepting connection:", err)
			continue
		}
		go handleClient(conn)
	}
}

func handleClient(conn net.Conn) {
    client := &Client{
        conn:     conn,
        nickname: "",
        room:     nil,
    }
    defer conn.Close()

    conn.Write([]byte("Welcome to the chat server! Please enter your nickname: "))
    scanner := bufio.NewScanner(conn)
    if scanner.Scan() {
        client.nickname = scanner.Text()
        conn.Write([]byte("Enter the name of the chat room: "))
    } else {
        return
    }

    if scanner.Scan() {
        roomName := scanner.Text()
        room, exists := chatRooms[roomName]
        if !exists {
            room = &ChatRoom{name: roomName, clients: make(map[*Client]struct{}), messages: make(chan string)}
            chatRooms[roomName] = room
            go room.Broadcast()
        }
        room.clients[client] = struct{}{}
        client.room = room
        conn.Write([]byte("You are now in the chat room '" + roomName + "'. Start chatting!\n"))

        for scanner.Scan() {
            message := scanner.Text()
            if strings.ToLower(message) == "/exit" {
                conn.Write([]byte("Leaving the chat room. Goodbye!\n"))
                break
            }
            room.messages <- client.nickname + ": " + message + "\n"
        }
    }

    // Client has disconnected, remove them from the room
    if client.room != nil {
        delete(client.room.clients, client)
    }
}

func (room *ChatRoom) Broadcast() {
	for message := range room.messages {
		for client := range room.clients {
			_, err := client.conn.Write([]byte(message))
			if err != nil {
				fmt.Println("Error sending message to client:", err)
				delete(room.clients, client)
			}
		}
	}
}
