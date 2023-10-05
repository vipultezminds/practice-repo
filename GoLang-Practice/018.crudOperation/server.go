package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"io/ioutil"
	"strconv"

	"github.com/gorilla/mux"
)

type Item struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

var items []Item

func main() {
	loadDataFromDB()

	r := mux.NewRouter()

	r.HandleFunc("/items", getItems).Methods("GET")
	r.HandleFunc("/items/{id}", getItem).Methods("GET")
	r.HandleFunc("/items", createItem).Methods("POST")
	r.HandleFunc("/items/{id}", updateItem).Methods("PUT")
	r.HandleFunc("/items/{id}", deleteItem).Methods("DELETE")

	http.Handle("/", r)
	fmt.Println("Server listening on port 8080")
	http.ListenAndServe(":8080", nil)
}

func loadDataFromDB() {
	data, err := ioutil.ReadFile("db.json")
	if err != nil {
		fmt.Println("Error loading data from db.json:", err)
		return
	}
	err = json.Unmarshal(data, &items)
	if err != nil {
		fmt.Println("Error unmarshalling data:", err)
		return
	}
}

func saveDataToDB() {
	data, err := json.MarshalIndent(items, "", "    ")
	if err != nil {
		fmt.Println("Error marshalling data:", err)
		return
	}
	err = ioutil.WriteFile("db.json", data, 0644)
	if err != nil {
		fmt.Println("Error writing data to db.json:", err)
	}
}

func getItems(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func getItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	for _, item := range items {
		if item.ID == id {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(Item{})
}

func createItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var item Item
	_ = json.NewDecoder(r.Body).Decode(&item)
	item.ID = len(items) + 1
	items = append(items, item)
	saveDataToDB()
	json.NewEncoder(w).Encode(item)
}

func updateItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	var updatedItem Item
	_ = json.NewDecoder(r.Body).Decode(&updatedItem)
	for index, item := range items {
		if item.ID == id {
			updatedItem.ID = item.ID 
			items[index] = updatedItem
			saveDataToDB()
			json.NewEncoder(w).Encode(updatedItem)
			return
		}
	}
	json.NewEncoder(w).Encode(Item{})
}


func deleteItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])
	for index, item := range items {
		if item.ID == id {
			items = append(items[:index], items[index+1:]...)
			saveDataToDB()
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(Item{})
}
