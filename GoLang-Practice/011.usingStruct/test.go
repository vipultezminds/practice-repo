package main

import (
    "fmt"
)

// Define a Person struct
type Person struct {
    FirstName string
    LastName  string
    Age       int
}

// Method to get the full name of a person
func (p Person) FullName() string {
    return p.FirstName + " " + p.LastName
}

func main() {
    // Create instances of the Person struct
    person1 := Person{
        FirstName: "Alice",
        LastName:  "Smith",
        Age:       25,
    }

    person2 := Person{
        FirstName: "Bob",
        LastName:  "Johnson",
        Age:       30,
    }

    // Access and print the fields of the struct
    fmt.Println("Person 1:")
    fmt.Printf("First Name: %s\n", person1.FirstName)
    fmt.Printf("Last Name: %s\n", person1.LastName)
    fmt.Printf("Age: %d\n", person1.Age)
    fmt.Printf("Full Name: %s\n", person1.FullName())

    fmt.Println("\nPerson 2:")
    fmt.Printf("First Name: %s\n", person2.FirstName)
    fmt.Printf("Last Name: %s\n", person2.LastName)
    fmt.Printf("Age: %d\n", person2.Age)
    fmt.Printf("Full Name: %s\n", person2.FullName())

    // Update the age of person2
    person2.Age = 32

    // Print the updated age
    fmt.Println("\nUpdated Age of Person 2:", person2.Age)
}
