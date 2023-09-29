package main

import "fmt"

func main(){
	// day := "Monday"

	var day string

	fmt.Println("Enter the Day between Monday to Sunday")
	
	// fmt.Scan(&day)

	_,err:=fmt.Scan(&day)

	if err!= nil{
		fmt.Println("Error Reading input :", err)
		return
	}


	switch day{
		case "Monday":
			fmt.Println("Heyaaa,, It's Monday")
		case "Tuesday":
			fmt.Println("Heyaaa,, It's Tuesday")
		case "Wednesday":
			fmt.Println("Heyaaa,, It's Wednesday")
		case "Thursday":
			fmt.Println("Heyaaa,, It's Thursday")
		case "Friday":
			fmt.Println("Heyaaa,, It's Friday")
		case "Saturday":
			fmt.Println("Heyaaa,, It's Saturday")
		case "Sunday":
			fmt.Println("Heyaaa,, It's Sunday")
		default: 
			fmt.Println("Wrong Input Bro")
	}
}