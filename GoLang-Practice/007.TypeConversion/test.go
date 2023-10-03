package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main(){
	fmt.Println("Welcome to Rating App")
	fmt.Println("Enter the Rating:")

	reader := bufio.NewReader(os.Stdin)

	input , _ := reader.ReadString('\n')

	numRating , err := strconv.ParseFloat(strings.TrimSpace(input),64)


	if err!=nil {
		fmt.Println(err)
	}else{
		if(numRating>5){
			fmt.Println("Rating should be under 1 to 5")
		}else{
			numRating++;
			if(numRating>5){
				fmt.Println("Rating Can't be increased more than 5")
			}else{
				fmt.Println("Rating you gave is increased :",numRating)
			}
		}
	}
}