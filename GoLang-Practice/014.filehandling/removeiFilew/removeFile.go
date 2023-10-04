package main

import (
    "fmt"
    "os"
)

func main() {
    err := os.Remove("example.txt")
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Println("File deleted successfully.")
}
