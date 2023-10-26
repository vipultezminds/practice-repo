package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

// Define the Users struct
type Users struct {
	Userid   int       `json:"userid"`
	Username string    `json:"username"`
	Userdp   string    `json:"userdp"`
	Fullname string    `json:"fullname"`
	RegDate  time.Time `json:"regdate"`
	Role     string    `json:"role"`
	Bio      string    `json:"bio"`
	IsActive bool      `json:"isactive"`
	Gender   string    `json:"gender"`
	MobNo    string    `json:"mobno"`
	Password string    `json:"password"`
}

// Define the Posts struct
type Posts struct {
	Author     int       `json:"author"`
	Postid     int       `json:"postid"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	ImageURL   string    `json:"imageurl"`
	CreatedOn  time.Time `json:"createdon"`
	UserString string    `json:"userstring"`
}

// Database connection
var db *sql.DB

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
	var err error
	db, err = sql.Open("mysql", connectionString)
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	} else {
		log.Println("Connected to the database")
	}
	defer db.Close()

	createDatabaseAndTables()

	r := mux.NewRouter()

	r.HandleFunc("/users", GetAllUsers).Methods("GET")
	r.HandleFunc("/users/{username}", GetUser).Methods("GET")
	r.HandleFunc("/users", CreateUser).Methods("POST")
	r.HandleFunc("/users/{username}", UpdateUser).Methods("PUT")
	r.HandleFunc("/users/{username}", DeleteUser).Methods("DELETE")

	r.HandleFunc("/posts", GetAllPosts).Methods("GET")
	r.HandleFunc("/posts/{title}", GetPost).Methods("GET")
	r.HandleFunc("/posts", CreatePost).Methods("POST")
	r.HandleFunc("/posts/{title}", UpdatePost).Methods("PUT")
	r.HandleFunc("/posts/{title}", DeletePost).Methods("DELETE")

	// Create a CORS handler
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // You should restrict this to the domains you want to allow
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Accept", "Content-Type", "Authorization"},
	})

	// Wrap the router with the CORS handler
	handler := c.Handler(r)

	serverAddr := ":8080"
	log.Printf("Server is running and listening on %s", serverAddr)
	log.Fatal(http.ListenAndServe(serverAddr, handler))
}

// GetAllUsers returns all users
func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	// Query the database for all users
	rows, err := db.Query("SELECT * FROM Users")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []Users
	for rows.Next() {
		var user Users
		var regDate []uint8 // Temporary variable to hold the RegDate

		err := rows.Scan(
			&user.Userid, &user.Username, &user.Userdp, &user.Fullname, &regDate,
			&user.Role, &user.Bio, &user.IsActive, &user.Gender, &user.MobNo, &user.Password,
		)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Convert regDate to a time.Time value
		user.RegDate, err = time.Parse("2006-01-02 15:04:05", string(regDate))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		users = append(users, user)
	}

	// Return the users as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

// GetUser returns a specific user by username
func GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	username := vars["username"]

	// Query the database for the user by username
	row := db.QueryRow("SELECT * FROM Users WHERE Username = ?", username)
	var user Users
	var regDate []uint8 // Temporary variable to hold the RegDate

	err := row.Scan(
		&user.Userid, &user.Username, &user.Userdp, &user.Fullname, &regDate,
		&user.Role, &user.Bio, &user.IsActive, &user.Gender, &user.MobNo, &user.Password,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	// Convert regDate to a time.Time value
	user.RegDate, err = time.Parse("2006-01-02 15:04:05", string(regDate))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return the user as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

// CreateUser creates a new user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	// Parse the JSON request body into a Users struct
	var user Users
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Set the RegDate to the current time
	user.RegDate = time.Now()

	// Insert the new user into the database using SQL placeholders
	_, err = db.Exec("INSERT INTO Users (Username, Userdp, Fullname, RegDate, Role, Bio, Gender, MobNo, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
		user.Username, user.Userdp, user.Fullname, user.RegDate, user.Role, user.Bio, user.Gender, user.MobNo, user.Password)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// UpdateUser updates an existing user by username
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	username := vars["username"]

	// Parse the JSON request body into a Users struct
	var user Users
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update the user in the database by username
	_, err = db.Exec("UPDATE Users SET Userdp=?, Fullname=?, Role=?, Bio=?, Gender=?, MobNo=?, Password=? WHERE Username=?", user.Userdp, user.Fullname, user.Role, user.Bio, user.Gender, user.MobNo, user.Password, username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// DeleteUser deletes a user by username
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	username := vars["username"]

	// Delete the user from the database by username
	_, err := db.Exec("DELETE FROM Users WHERE Username = ?", username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// GetAllPosts returns all posts
func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	// Query the database for all posts
	rows, err := db.Query("SELECT * FROM Posts")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var posts []Posts
	for rows.Next() {
		var post Posts
		err := rows.Scan(&post.Postid, &post.Title, &post.Content, &post.ImageURL, &post.CreatedOn, &post.UserString)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		posts = append(posts, post)
	}

	// Return the posts as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// GetPost returns a specific post by title
func GetPost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	title := vars["title"]

	// Query the database for the post by title
	row := db.QueryRow("SELECT * FROM Posts WHERE Title = ?", title)
	var post Posts
	err := row.Scan(&post.Postid, &post.Title, &post.Content, &post.ImageURL, &post.CreatedOn, &post.UserString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	// Return the post as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

// CreatePost creates a new post
func CreatePost(w http.ResponseWriter, r *http.Request) {
	// Parse the JSON request body into a Posts struct
	var post Posts
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Insert the new post into the database using SQL placeholders
	_, err = db.Exec("INSERT INTO Posts (Title, Content, ImageURL, CreatedOn, UserString) VALUES (?, ?, ?, ?, ?)",
		post.Title, post.Content, post.ImageURL, post.CreatedOn, post.UserString)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// UpdatePost updates an existing post by title
func UpdatePost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	title := vars["title"]

	// Parse the JSON request body into a Posts struct
	var post Posts
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update the post in the database by title
	_, err = db.Exec("UPDATE Posts SET Content=?, ImageURL=?, CreatedOn=?, UserString=? WHERE Title=?", post.Content, post.ImageURL, post.CreatedOn, post.UserString, title)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// DeletePost deletes a post by title
func DeletePost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	title := vars["title"]

	// Delete the post from the database by title
	_, err := db.Exec("DELETE FROM Posts WHERE Title = ?", title)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func createDatabaseAndTables() {
	// Create the database if it does not exist
	_, err := db.Exec("CREATE DATABASE IF NOT EXISTS socialnetwork")
	if err != nil {
		log.Fatalf("Error creating database: %v", err)
	}

	// Select the database
	_, err = db.Exec("USE socialnetwork")
	if err != nil {
		log.Fatalf("Error selecting database: %v", err)
	}

	// Create the Users table if it does not exist
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS Users (
        Userid INT AUTO_INCREMENT,
        Username VARCHAR(50) UNIQUE NOT NULL,
        Userdp VARCHAR(255),
        Fullname VARCHAR(100) NOT NULL,
        RegDate DATETIME,
        Role VARCHAR(50) NOT NULL,
        Bio VARCHAR(255),
		IsActive BOOLEAN DEFAULT FALSE,
        Gender VARCHAR(10),
        MobNo VARCHAR(15),
        Password VARCHAR(255) NOT NULL,
        PRIMARY KEY (Userid)
    )`)
	if err != nil {
		log.Fatalf("Error creating Users table: %v", err)
	}

	// Create the Posts table if it does not exist
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS Posts (
        Postid INT AUTO_INCREMENT,
        Title VARCHAR(255) UNIQUE NOT NULL,
        Content TEXT NOT NULL,
        ImageURL VARCHAR(255),
        CreatedOn DATETIME,
        UserString VARCHAR(50),
        PRIMARY KEY (Postid)
    )`)
	if err != nil {
		log.Fatalf("Error creating Posts table: %v", err)
	}
}
