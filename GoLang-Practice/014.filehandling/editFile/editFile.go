package main

import (
    "fmt"
    "io/ioutil"
    "strings"
)

func main() {
    content, err := ioutil.ReadFile("../output.txt")
    if err != nil {
        fmt.Println(err)
        return
    }

    modifiedContent := strings.Replace(string(content), "Hellooooooooo", "Hello", -1)

    err = ioutil.WriteFile("../output.txt", []byte(modifiedContent), 0644)
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Println("File edited successfully.")
}
