// package main

// import (
//     "bufio"
//     "fmt"
//     "log"
//     "net"
//     "os"
//     "strings"
// )

// func main() {
//     serverAddr := "localhost:8080"

//     conn, err := net.Dial("tcp", serverAddr)
//     if err != nil {
//         panic(err)
//     }
//     defer conn.Close()

//     var username string

//     for {
//         fmt.Println("Choose an option:")
//         fmt.Println("1. View your chat history")
//         fmt.Println("2. Chat with connected users")
//         fmt.Print("Enter the option number: ")
//         var choice int
//         _, err := fmt.Scanln(&choice)
//         if err != nil {
//             fmt.Println("Error reading choice:", err)
//             return
//         }

//         switch choice {
//         case 1:
//             fmt.Print("Enter your username: ")
//             _, err := fmt.Scanln(&username)
//             if err != nil {
//                 fmt.Println("Error reading username:", err)
//                 return
//             }

//             viewChatHistory(username)
//         case 2:
//             fmt.Print("Enter your username: ")
//             _, err := fmt.Scanln(&username)
//             if err != nil {
//                 fmt.Println("Error reading username:", err)
//                 return
//             }

//             go receiveMessages(conn)
//             chatWithUsers(conn, username)
//         default:
//             fmt.Println("Invalid choice. Please enter 1 or 2.")
//         }
//     }
// }

// func receiveMessages(conn net.Conn) {
//     historyFile, err := os.Create("clientChatHistory.txt")
//     if err != nil {
//         log.Fatal(err)
//     }
//     defer historyFile.Close()

//     for {
//         message := make([]byte, 1024)
//         n, err := conn.Read(message)
//         if err != nil {
//             panic(err)
//         }

//         // Print the received message to the console
//         fmt.Println(string(message[:n]))

//         // Write the received message to the client's chat history file
//         _, err = historyFile.Write(message[:n])
//         if err != nil {
//             log.Fatal(err)
//         }
//     }
// }

// func viewChatHistory(username string) {
//     // Open the file
//     file, err := os.Open("clientChatHistory.txt")
//     if err != nil {
//         fmt.Println("Error opening file:", err)
//         return
//     }
//     defer file.Close()

//     // Create a slice to store the lines related to the input username
//     var userLines []string

//     // Read each line from the file
//     scanner := bufio.NewScanner(file)
//     for scanner.Scan() {
//         line := scanner.Text()

//         // Check if the line contains "connected" or "disconnected"
//         if strings.Contains(line, "connected") || strings.Contains(line, "disconnected") {
//             continue // Skip lines with "connected" or "disconnected"
//         }

//         // Split the line by ":" and retrieve the username
//         parts := strings.Split(line, " ")
//         if len(parts) >= 4 {
//             raw := strings.TrimSpace(parts[2])
//             chatUsername := strings.Split(raw, ":")[0]

//             // Check if the username matches the input username (case-sensitive)
//             if chatUsername == username {
//                 userLines = append(userLines, line)
//             }
//         }
//     }

//     if err := scanner.Err(); err != nil {
//         fmt.Println("Error reading file:", err)
//         return
//     }

//     // Print the retrieved lines related to the input username
//     fmt.Println("Lines related to", username, ":")
//     for _, userLine := range userLines {
//         fmt.Println(userLine)
//     }
// }

// func chatWithUsers(conn net.Conn, username string) {
//     for {
//         message, _ := bufio.NewReader(os.Stdin).ReadString('\n')
//         message = strings.TrimSpace(message)

//         if message == "/exit" {
//             return
//         }

//         msg := username + ": " + message
//         _, err := conn.Write([]byte(msg))
//         if err != nil {
//             log.Fatal(err)
//         }
//     }
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
	serverAddr := "localhost:8080"

	conn, err := net.Dial("tcp", serverAddr)
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	var username string

	for {
		fmt.Println("Choose an option:")
		fmt.Println("1. View your chat history")
		fmt.Println("2. Chat with connected users")
		fmt.Println("3. Retrieve all unique users")
		fmt.Print("Enter the option number: ")
		var choice int
		_, err := fmt.Scanln(&choice)
		if err != nil {
			fmt.Println("Error reading choice:", err)
			return
		}

		switch choice {
		case 1:
			fmt.Print("Enter your username: ")
			_, err := fmt.Scanln(&username)
			if err != nil {
				fmt.Println("Error reading username:", err)
				return
			}
			viewChatHistory(username)
		case 2:
			fmt.Print("Enter your username: ")
			_, err := fmt.Scanln(&username)
			if err != nil {
				fmt.Println("Error reading username:", err)
				return
			}
			go receiveMessages(conn)
			chatWithUsers(conn, username)
		case 3:
			retrieveUniqueUsers()
		default:
			fmt.Println("Invalid choice. Please enter 1, 2, or 3.")
		}
	}
}

func receiveMessages(conn net.Conn) {
	historyFile, err := os.Create("clientChatHistory.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer historyFile.Close()

	for {
		message := make([]byte, 1024)
		n, err := conn.Read(message)
		if err != nil {
			panic(err)
		}

		// Print the received message to the console
		fmt.Println(string(message[:n]))

		// Write the received message to the client's chat history file
		_, err = historyFile.Write(message[:n])
		if err != nil {
			log.Fatal(err)
		}
	}
}

func viewChatHistory(username string) {
	// Open the file
	file, err := os.Open("clientChatHistory.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// Create a slice to store the lines related to the input username
	var userLines []string

	// Read each line from the file
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		// Check if the line contains "connected" or "disconnected"
		if strings.Contains(line, "connected") || strings.Contains(line, "disconnected") {
			continue // Skip lines with "connected" or "disconnected"
		}

		// Split the line by ":" and retrieve the username
		parts := strings.Split(line, " ")
		if len(parts) >= 4 {
			raw := strings.TrimSpace(parts[2])
			chatUsername := strings.Split(raw, ":")[0]

			// Check if the username matches the input username (case-sensitive)
			if chatUsername == username {
				userLines = append(userLines, line)
			}
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	// Print the retrieved lines related to the input username
	fmt.Println("Lines related to", username, ":")
	for _, userLine := range userLines {
		fmt.Println(userLine)
	}
}

func retrieveUniqueUsers() {
	file, err := os.Open("clientChatHistory.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	uniqueUsers := make(map[string]bool)

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, " ")

		// Check if the line contains "connected" or "disconnected"
		if strings.Contains(line, "connected") || strings.Contains(line, "disconnected") {
			continue // Skip lines with "connected" or "disconnected"
		}

		if len(parts) >= 4 {
			raw := strings.TrimSpace(parts[2])
			chatUsername := strings.Split(raw, ":")[0]
			uniqueUsers[chatUsername] = true
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	fmt.Println("Unique users in chat history:")
	for user := range uniqueUsers {
		fmt.Println(user)
	}
}

func chatWithUsers(conn net.Conn, username string) {
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