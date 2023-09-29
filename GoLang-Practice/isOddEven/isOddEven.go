package main

import "fmt"


func main(){
	number := 675;
	if(number%2==1){
		fmt.Println(number," is Odd")
	}else{
		fmt.Println(number," is Even")
	}

	const pi = 3.14159
	// pi = 4; This line will give error
	fmt.Println("Constant Variable PI =",pi)
}