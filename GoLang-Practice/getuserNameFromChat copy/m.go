package main

import (
	"fmt"
	tsize "github.com/kopoli/go-terminal-size"
)

func printMessageAtRight(message string) {
	size, err := tsize.GetSize()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	spaces := size.Width - len(message)

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

func main() {
	message := "This message adsfa sdfas dfasd fasdfa sdf asdf"
	printMessageAtRight(message)
}
