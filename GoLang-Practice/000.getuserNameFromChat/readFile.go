package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
    // Prompt the user for a username
    fmt.Print("Enter a username: ")
    var inputUsername string
    _, err := fmt.Scanln(&inputUsername)
    if err != nil {
        fmt.Println("Error reading username:", err)
        return
    }

    // Open the file
    file, err := os.Open("saveChat.txt")
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
            username := strings.Split(raw, ":")[0]

            // Check if the username matches the input username (case-sensitive)
            if username == inputUsername {
                userLines = append(userLines, line)
            }
        }
    }

    if err := scanner.Err(); err != nil {
        fmt.Println("Error reading file:", err)
        return
    }

    // Print the retrieved lines related to the input username
    fmt.Println("Lines related to", inputUsername, ":")
    for _, userLine := range userLines {
        fmt.Println(userLine)
    }
}
