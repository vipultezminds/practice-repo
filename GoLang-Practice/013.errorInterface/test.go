package main

import (
	"fmt"
)

// CustomError is a custom error type that implements the error interface.
type CustomError struct {
	message string
}

// Implement the Error method for the CustomError type.
func (ce *CustomError) Error() string {
	return ce.message
}

// Function that returns a custom error.
func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, &CustomError{"division by zero"}
	}
	return a / b, nil
}

func main() {
	result, err := divide(10, 2)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Result:", result)
	}

	result, err = divide(10, 0)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Result:", result)
	}
}
