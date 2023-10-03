package main

import "fmt"

func main(){
	number := 68;
	fmt.Println("Value of number is ",number)

	reference := &number; // &number will give address of number, which will be then stored in reference variable

	fmt.Println("Reference address of number variable =",reference)

	*reference = *reference + 1; // *reference will check value at (stored in reference variable) *reference and return the value,, and that value will be from number variable

	fmt.Println("After doing operation on *reference value of number is ",number)
}