package main

import (
	"fmt"
	"net"
	"os"
)

const (
	SERVER_HOST = "localhost"
	SERVER_PORT = "9988"
	SERVER_TYPE = "tcp"
)

func main() {
	fmt.Println("Server Running....")
	server, err := net.Listen(SERVER_TYPE, SERVER_HOST+":"+SERVER_PORT)
	if err != nil {
		fmt.Println("Error Listening: ", err.Error())
		os.Exit(1)
	}
	defer server.Close()
	fmt.Println("Listening on " + SERVER_HOST + ":" + SERVER_PORT)
	fmt.Println("Waiting for Client...")

	for {
		_, err := server.Accept()
		if err != nil {
			fmt.Println("Error Accepting: ", err.Error())
			os.Exit(1)
		}
		fmt.Println("Client Connected")
	}
}
