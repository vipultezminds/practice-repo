package main

import "fmt"

func main() {
	fmt.Println("Slice operation, Deep copy and shallow copy complete understanding")

	arr := [10]int{1,2,3,4,5,6,7,8,9,10}

	fmt.Println("Initialised Array is :",arr)

	slice := arr[:6]

	fmt.Println("Sliced array is ",slice)

	dup := arr

	fmt.Println("Duplicate array is ",dup)

	fmt.Println("Making Changes in Sliced array")

	slice[0] = 456

	fmt.Println("Original Array =",arr,"\nSliced Array is ",slice)

	fmt.Println("Duplicate Array =",dup)
}