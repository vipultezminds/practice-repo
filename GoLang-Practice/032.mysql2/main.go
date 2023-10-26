package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

// Define a struct to represent the data you want to store in the database
type Person struct {
	ID   int
	Name string
	Age  int
}

func main() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get database credentials from environment variables
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	// Construct the connection string
	connectionString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)

	// Connect to the MySQL server
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create the database (if it doesn't already exist)
	createDatabaseQuery := "CREATE DATABASE IF NOT EXISTS testingDatabase"
	_, err = db.Exec(createDatabaseQuery)
	if err != nil {
		log.Fatal(err)
	}

	// Select the created database
	_, err = db.Exec("USE testingDatabase")
	if err != nil {
		log.Fatal(err)
	}

	// Create a table if it doesn't exist
	createTableQuery := `
        CREATE TABLE IF NOT EXISTS people (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            age INT
        )`
	_, err = db.Exec(createTableQuery)
	if err != nil {
		log.Fatal(err)
	}

	// Perform CRUD operations

	// Create (Insert)
	insertQuery := "INSERT INTO people (name, age) VALUES (?, ?)"
	_, err = db.Exec(insertQuery, "John Doe", 30)
	if err != nil {
		log.Fatal(err)
	}

	// Read (Select)
	rows, err := db.Query("SELECT id, name, age FROM people")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var people []Person
	for rows.Next() {
		var p Person
		err := rows.Scan(&p.ID, &p.Name, &p.Age)
		if err != nil {
			log.Fatal(err)
		}
		people = append(people, p)
	}

	// Print the retrieved data
	fmt.Println("People:")
	for _, p := range people {
		fmt.Printf("ID: %d, Name: %s, Age: %d\n", p.ID, p.Name, p.Age)
	}

	// Update
	updateQuery := "UPDATE people SET age = ? WHERE name = ?"
	_, err = db.Exec(updateQuery, 31, "John Doe")
	if err != nil {
		log.Fatal(err)
	}

	// Delete
	deleteQuery := "DELETE FROM people WHERE name = ?"
	_, err = db.Exec(deleteQuery, "John Doe")
	if err != nil {
		log.Fatal(err)
	}
}
