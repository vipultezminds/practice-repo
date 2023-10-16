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
	conn, err := net.Dial("tcp", "localhost:8080")
	if err != nil {
		fmt.Println("Error connecting to the server:", err)
		os.Exit(1)
	}
	defer conn.Close()

	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter your username: ")
	username, _ := reader.ReadString('\n')
	username = username[:len(username)-1] // Remove the newline character

	fmt.Println("Welcome, " + username + "!")

	for {
		fmt.Print("Choose an option (1 for Signup, 2 for Login, 3 to Quit): ")
		option, _ := reader.ReadString('\n')
		option = option[:len(option)-1] // Remove the newline character

		switch option {
		case "1":
			// Signup

			// Enter fullname
			fmt.Print("Enter Your Full Name: ")
			fullname, _ := reader.ReadString('\n')
			fullname = fullname[:len(fullname)-1] // Remove the newline character

			// Enter Bio of user
			fmt.Print("Enter His Bio Details: ")
			bio, _ := reader.ReadString('\n')
			bio = bio[:len(bio)-1] // Remove the newline character

			// Enter the role
			fmt.Print("Enter User's Role: ")
			role, _ := reader.ReadString('\n')
			role = role[:len(role)-1] // Remove the newline character

			fmt.Print("Enter your password: ")
			password, _ := reader.ReadString('\n')
			password = password[:len(password)-1] // Remove the newline character

			// Send the signup request to the server
			fmt.Fprint(conn, "/signup:"+username+":"+password+":"+fullname+":"+bio+":"+role+"\n")

			// Read the server's response
			response, err := bufio.NewReader(conn).ReadString('\n')
			if err != nil {
				fmt.Println("Error reading server response:", err)
			}
			fmt.Println(response)

		case "2":
			// Login
			fmt.Print("Enter your password: ")
			password, _ := reader.ReadString('\n')
			password = password[:len(password)-1] // Remove the newline character

			// Send the login request to the server
			fmt.Fprint(conn, "/login:"+username+":"+password+"\n")

			// Read the server's response
			response, err := bufio.NewReader(conn).ReadString('\n')
			if err != nil {
				fmt.Println("Error reading server response:", err)
			}
			fmt.Println(response)

			// If login is successful, start the chat
			if response == "Login successful.\n" {
				go readMessages(conn)
				sendMessages(conn, username)
				return
			}

		case "3":
			// Quit
			fmt.Println("Goodbye!")
			return

		default:
			fmt.Println("Invalid option. Please choose 1 for Signup, 2 for Login, or 3 to Quit.")
		}
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

func sendMessages(conn net.Conn, username string) {
	for {
		message, _ := bufio.NewReader(os.Stdin).ReadString('\n')
		message = message[:len(message)-1] // Remove the newline character
		if message != "" {
			fmt.Fprint(conn, username+":"+message+"\n")
		}
	}
}
