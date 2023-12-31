package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net"
	"os"
	"os/exec"
	"regexp"
	"runtime"
	"strings"

	"gitlab.com/david_mbuvi/go_asterisks"
	tsize "github.com/kopoli/go-terminal-size"
)

type UserInfo struct {
	Fullname       string `json:"fullname"`
	Bio            string `json:"bio"`
	Role           string `json:"role"`
	SignupDateTime string `json:"signupDateTime"`
	IsActive       bool   `json:"isActive"`
	LastSeen       string `json:"LastSeen"`
}

var clear map[string]func() //create a map for storing clear funcs

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

	for {
		fmt.Print("Choose an option:\n1.Signup\n2.Login\n")
		fmt.Print("Enter Your Choice : ")
		option, _ := reader.ReadString('\n')
		option = option[:len(option)-1] // Remove the newline character

		switch option {
		case "1":
			// Signup
			for {
				fmt.Print("Enter your username: ")
				username, _ := reader.ReadString('\n')
				username = username[:len(username)-1] // Remove the newline character

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

				for {
					fmt.Print("Enter your password: ")
					bytePassword, err := go_asterisks.GetUsersPassword("", true, os.Stdin, os.Stdout)
					if err != nil {
						fmt.Println(err.Error())
					}
					password := string(bytePassword)

					if isValidPassword(password) {
						// Send the signup request to the server
						fmt.Fprint(conn, "/signup:"+username+":"+password+":"+fullname+":"+bio+":"+role+"\n")
						// Read the server's response
						response, err := bufio.NewReader(conn).ReadString('\n')
						if err != nil {
							fmt.Println("Error reading server response:", err)
						}
						fmt.Println(response)
						break
					} else {
						fmt.Println("Invalid password. Password should be at least 8 characters and meet the specified criteria. Please try again.")
					}
				}

				break // Break out of the signup loop
			}

		case "2":
			// Login
			fmt.Print("Enter your username: ")
			username, _ := reader.ReadString('\n')
			username = username[:len(username)-1] // Remove the newline character

			fmt.Print("Enter your password: ")

			// if want the password to be hidden
			// bytePassword, err := term.ReadPassword(syscall.Stdin)
			// if err != nil {
			// 	panic(err)
			// }

			// password := string(bytePassword)

			// if want password hidden with asterisks
			bytePassword, err := go_asterisks.GetUsersPassword("", true, os.Stdin, os.Stdout)
			if err != nil {
				fmt.Println(err.Error())
			}
			password := string(bytePassword)

			// Send the login request to the server
			fmt.Fprint(conn, "/login:"+username+":"+password+"\n")

			// Read the server's response
			response, err := bufio.NewReader(conn).ReadString('\n')
			if err != nil {
				fmt.Println("Error reading server response:", err)
			}
			fmt.Println(response)

			if response == "Login successful.\n" {
				fmt.Print("Choose an option:\n1.RetrieveAllChat History\n")
				fmt.Println("2.Retrieve All Chat by a User.")
				fmt.Println("3.Retrieve User Info.")
				fmt.Println("4.World Chat.")
				fmt.Println("5.Chat With Specific User.")
				fmt.Println("6.Load Chat with specific user.")
				fmt.Println("Press CTRL + C to Logout")
				fmt.Print("Enter Your Choice : ")

				option, _ := reader.ReadString('\n')
				option = option[:len(option)-1] // Remove the newline character

				switch option {
				case "1":
					// Retrieve all chat history
					fmt.Println("Retrieving All Chat History...")
					retrieveAndDisplayChatHistory(conn)

				case "2":
					// Retrieve all chat history
					fmt.Println("Retrieving All Chat History...")

					fmt.Print("Enter Username: ")
					username, _ := reader.ReadString('\n')
					username = username[:len(username)-1] // Remove the newline character
					retrieveAndDisplayChatHistoryByUser(conn, username)

				case "3":
					fmt.Print("Enter Username:")
					username, _ := reader.ReadString('\n')
					username = username[:len(username)-1] // Remove the newline character
					retrieveUserInformation(conn, username)

				case "4":
					go readMessages(conn)
					sendMessages(conn, username)
					return

				case "5":
					// Private Chat
					go readPrivateMessages(conn)
					sendPrivateMessages(conn, username)
					return
				case "6":
					go readPrivateMessages(conn)
					reader := bufio.NewReader(os.Stdin)
					fmt.Print("Enter recipient's username: ")
					recipient, _ := reader.ReadString('\n')
					recipient = recipient[:len(recipient)-1] // Remove the newline character

					// Send a request to load the chat history with the specific user
					fmt.Fprintf(conn, "/loaduserchathistory:%s\n", recipient)

					// Read and display the chat history
					for {
						message, err := bufio.NewReader(conn).ReadString('\n')
						if err != nil {
							fmt.Println("Connection to the server has been closed.")
							os.Exit(1)
						}
						fmt.Print(message)
					}
				default:
					fmt.Println("Invalid option. Please choose 1 for Signup, 2 for Login, or 3 to Quit.")
				}
			}

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
func retrieveAndDisplayChatHistory(conn net.Conn) {
	// Send the request to the server
	fmt.Fprint(conn, "/retrieveAllChat")

	reader := bufio.NewReader(conn)
	for {
		response, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("Error reading server response:", err)
			break
		}
		fmt.Print(response)
	}
}
func retrieveAndDisplayChatHistoryByUser(conn net.Conn, username string) {
	// Send the request to the server
	fmt.Fprint(conn, "/retrieveUserChat:"+username+"\n")

	reader := bufio.NewReader(conn)
	for {
		response, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("Error reading server response:", err)
			break
		}
		fmt.Print(response)
	}
}
func retrieveUserInformation(conn net.Conn, username string) {
	// Send the request to the server
	fmt.Fprintf(conn, "/retrieveUserInformation:%s\n", username)

	reader := bufio.NewReader(conn)
	response, err := reader.ReadString('\n')
	if err != nil {
		fmt.Println("Error reading server response:", err)
		return
	}

	if strings.HasPrefix(response, "{") {
		// It seems like a JSON response, so parse it
		var userInfo UserInfo
		if err := json.Unmarshal([]byte(response), &userInfo); err != nil {
			fmt.Println("Error parsing JSON:", err)
			return
		}
		fmt.Print("\n\n\n")
		// Display the user information
		fmt.Println("User Information:")
		fmt.Println("Full Name: ", userInfo.Fullname)
		fmt.Println("Bio: ", userInfo.Bio)
		fmt.Println("Role: ", userInfo.Role)

		if userInfo.IsActive {
			fmt.Println("IsActive: ", userInfo.IsActive)
		} else {
			fmt.Println("LastSeen: ", userInfo.LastSeen)
		}
		fmt.Println("Signup Date and Time: ", userInfo.SignupDateTime)

	} else {
		fmt.Println("Unexpected server response:", response)
	}
}

func isValidPassword(password string) bool {
	secure := true
	tests := []string{".{8,}", "[a-z]", "[A-Z]", "[0-9]", "[^\\d\\w]"}
	for _, test := range tests {
		t, err := regexp.MatchString(test, password)
		if err != nil {
			fmt.Printf("Regex error: %v\n", err)
			return false
		}

		if !t {
			secure = false
			break
		}
	}
	return secure
}
func CallClear() {
	value, ok := clear[runtime.GOOS]
	if ok {
		value()
	} else {
		panic("Your platform is unsupported! I can't clear terminal screen :(")
	}
}

func sendPrivateMessages(conn net.Conn, username string) {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Enter recipient's username: ")
	recipient, _ := reader.ReadString('\n')
	recipient = recipient[:len(recipient)-1] // Remove the newline character

	clear = make(map[string]func()) //Initialize it
	clear["linux"] = func() {
		cmd := exec.Command("clear") //Linux example, its tested
		cmd.Stdout = os.Stdout
		cmd.Run()
	}

	CallClear()

	CheckOnline(conn, recipient)

	for {
		message, _ := reader.ReadString('\n')
		message = message[:len(message)-1] // Remove the newline character
		if message != "" {
			fmt.Fprint(conn, "Private message to "+recipient+": "+message+"\n")
		}
	}
}
func readPrivateMessages(conn net.Conn) {
	for {
		message, err := bufio.NewReader(conn).ReadString('\n')
		if err != nil {
			fmt.Println("Connection to the server has been closed.")
			os.Exit(1)
		}
		// if string contains world chat it won't let it print
		if !strings.HasPrefix(message, "World Chat:") {
			// fmt.Println(message)
			printMessageAtRight(message)
		}
	}
}
func CheckOnline(conn net.Conn, username string) {
	// Send the request to the server
	fmt.Fprintf(conn, "/checkUserOnline:%s\n", username)
}
func printMessageAtRight(message string) {
	size, err := tsize.GetSize()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	spaces := size.Width - len(message)
	spaces = spaces - 33

	if spaces > 0 {
		for i := 0; i < spaces; i++ {
			fmt.Print(" ")
		}
		fmt.Print(message)
	} else {
		fmt.Print(message)
	}
	fmt.Println() // Move to the next line
}
