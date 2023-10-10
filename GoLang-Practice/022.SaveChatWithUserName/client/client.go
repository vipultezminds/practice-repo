package main

import (
	"bufio"
	"fmt"
	"io"
	"net"
	"os"
	"strings"
	"time"
)

const (
	SERVER_HOST = "192.168.1.19"
	SERVER_PORT = "9988"
	SERVER_TYPE = "tcp"
)

var file, _ = os.OpenFile("./mylogfile.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

var senderIP string = "192.168.1.40"
var receiverIp string

func main() {
	connection, err := net.Dial(SERVER_TYPE, SERVER_HOST+":"+SERVER_PORT)
	if err != nil {
		fmt.Println("Error connecting to server:", err.Error())
		os.Exit(1)
	}
	defer connection.Close()

	if err != nil {
		panic(err)
	}

	clientAddr := connection.RemoteAddr().String()

	go func() { serverStart(clientAddr, connection) }()
	fmt.Print("\nHost to connect to: ")
	var host string
	fmt.Scanln(&host)

	ip, _, err := net.SplitHostPort(host)
	if err != nil {
		fmt.Println("Invalid input format. Please provide IP address and port.")
		return
	}

	receiverIp = ip

	prevMessages()

	for {

		scanner := bufio.NewScanner(os.Stdin)
		scanner.Scan()

		currentTime := time.Now()

		timeString := currentTime.Format("2006-01-02 15:04:05")

		text := senderIP + " " + receiverIp + " " + "Vipul : " + timeString + " " + scanner.Text() + "\n"

		_, err := io.WriteString(file, text)

		if err != nil {
			panic(err)
		}

		SendMessage(timeString+" "+scanner.Text()+"\n", host)

	}
}

func prevMessages() {

	file, err := os.Open("./mylogfile.txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	target := receiverIp

	for scanner.Scan() {
		line := scanner.Text()
		words := strings.Fields(line)

		if len(words) >= 2 && words[1] == target {
			arr := append(words[2:])
			finalOutput := strings.Join(arr, " ")
			fmt.Println(strings.Trim(finalOutput, "[]"))
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}
}

func serverStart(clientAddr string, connection net.Conn) {

	PORT := ":" + os.Args[1]

	l, err := net.Listen("tcp", PORT)

	if err != nil {
		fmt.Println(err)
		return
	}

	defer l.Close()

	for {
		c, err := l.Accept()
		if err != nil {
			fmt.Println(err)
			return
		}

		go HandleNewMsg(c, connection)

	}
}

func HandleNewMsg(c net.Conn, connection net.Conn) {

	clientAddr := c.RemoteAddr().String()

	receiverIp = strings.Split(clientAddr, ":")[0]

	for {
		netData, err := bufio.NewReader(c).ReadString('\n')

		if err != nil {
			fmt.Println(err)
			return
		}

		msg := strings.TrimSpace(string(netData))

		println(msg)

		text := senderIP + " " + receiverIp + " " + msg + "\n"

		io.WriteString(file, text)

		if err != nil {
			panic(err)
		}

		c.Close()

	}
}

func SendMessage(message, host string) {

	CONNECT := host
	c, err := net.Dial("tcp", CONNECT)
	if err != nil {
		fmt.Println(err)
		return
	}

	c.Write([]byte("Vipul :" + " " + message + "\n"))
	bufio.NewReader(c).ReadString('\n')

}
