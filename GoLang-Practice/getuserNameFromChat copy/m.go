package main

import "fmt"

func main() {
    // Print some lines to move the cursor to the bottom
    for i := 0; i < 10; i++ {
        fmt.Println()
    }

    // Print your content at the bottom
    fmt.Println("This is the bottom of the terminal.")
}
