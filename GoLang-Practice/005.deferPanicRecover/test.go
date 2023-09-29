package main

import "fmt"

func main(){
	defer func(){
		if r:= recover();r!=nil {
			fmt.Println("Recovered from Panic : ",r)
		}
		fmt.Println("Let's check if it runs or not")
		
	}()

	fmt.Println("Program started executing,, Let's see what happens next")

	panic("Something went Wrong")


	// fmt.Println("This statement will not be executed anyways")
}