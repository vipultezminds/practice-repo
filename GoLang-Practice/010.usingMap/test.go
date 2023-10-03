package main

import "fmt"

func main() {
	
	ages := map[string]int{
		"Alice": 25,
		"Bob":   30,
		"Carol": 35,
	}

	
	ages["Bob"] = 34;
	
	fmt.Println(ages)

	for name, age := range ages {
		fmt.Printf("%s is %d years old\n", name, age)
	}
	
}
