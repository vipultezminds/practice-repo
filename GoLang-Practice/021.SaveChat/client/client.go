// // package main

// // import (
// // 	"bufio"
// // 	"fmt"
// // 	"log"
// // 	"net"
// // 	"os"
// // 	"strings"
// // )

// // func main() {
// // 	serverAddr := "localhost:8080"

// // 	conn, err := net.Dial("tcp", serverAddr)
// // 	if err != nil {
// // 		panic(err)
// // 	}
// // 	defer conn.Close()

// // 	fmt.Print("Enter your username: ")
// // 	username, _ := bufio.NewReader(os.Stdin).ReadString('\n')
// // 	username = strings.TrimSpace(username)

// // 	go receiveMessages(conn)

// // 	for {
// // 		message, _ := bufio.NewReader(os.Stdin).ReadString('\n')
// // 		message = strings.TrimSpace(message)

// // 		if message == "/exit" {
// // 			return
// // 		}

// // 		msg := username + ": " + message
// // 		_, err := conn.Write([]byte(msg))
// // 		if err != nil {
// // 			log.Fatal(err)
// // 		}
// // 	}
// // }

// // func receiveMessages(conn net.Conn) {
// // 	for {
// // 		message := make([]byte, 1024)
// // 		n, err := conn.Read(message)
// // 		if err != nil {
// // 			panic(err)
// // 		}
// // 		fmt.Println(string(message[:n]))
// // 	}
// // }

// package main

// import (
// 	"fmt"
// 	"net"
// 	"os"
// )

// const (
// 	SERVER_HOST = "192.168.1.19"
// 	SERVER_PORT = "9988"
// 	SERVER_TYPE = "tcp"
// )

// func main() {
// 	fmt.Println("Server Running....")
// 	server, err := net.Listen(SERVER_TYPE, SERVER_HOST+":"+SERVER_PORT)
// 	if err != nil {
// 		fmt.Println("Error Listening: ", err.Error())
// 		os.Exit(1)
// 	}
// 	defer server.Close()
// 	fmt.Println("Listening on " + SERVER_HOST + ":" + SERVER_PORT)
// 	fmt.Println("Waiting for Client...")

// 	for {
// 		_, err := server.Accept()
// 		if err != nil {
// 			fmt.Println("Error Accepting: ", err.Error())
// 			os.Exit(1)
// 		}
// 		fmt.Println("Client Connected")
// 	}
// }


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
	// serverAddr := "localhost:8080"
	fmt.Printf("Enter IP Address along with PORT")
	serverAddr , _ := bufio.NewReader(os.Stdin).ReadString('\n')
	serverAddr = strings.TrimSpace(serverAddr)


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
