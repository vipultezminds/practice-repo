package main

import "fmt"

// Rectangle type represents a rectangle with width and height.
type Rectangle struct {
	Width  float64
	Height float64
}

// Function to calculate the area of a rectangle.
func calculateAreaFunction(rect Rectangle) float64 {
	return rect.Width * rect.Height
}

// Method to calculate the area of a rectangle using the Rectangle type receiver.
func (r Rectangle) calculateAreaMethod() float64 {
	return r.Width * r.Height
}

func main() {
	// Create a rectangle using the Rectangle struct.
	myRect := Rectangle{Width: 5.0, Height: 3.0}

	// Using a function to calculate the area of the rectangle.
	areaFunction := calculateAreaFunction(myRect)
	fmt.Printf("Using a function: The area of the rectangle is %.2f square units\n", areaFunction)

	// Using a method to calculate the area of the rectangle.
	areaMethod := myRect.calculateAreaMethod()
	fmt.Printf("Using a method: The area of the rectangle is %.2f square units\n", areaMethod)
}
