package main

import (
    "fmt"
    "os"
)

func main() {

    file, err := os.Create("../output.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer file.Close() 

    data := "Hello, Worrrrrrrrrrrrrrrld!"
    bytesWritten, err := file.WriteString(data)
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Println("Data written successfully. And Total byteswrtitten are",bytesWritten)
}
