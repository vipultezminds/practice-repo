package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/plain")

    fmt.Fprintf(w, "Hello, World!")

    w.WriteHeader(http.StatusOK)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", handler)

    // Start the HTTP server on port 8080
    fmt.Println("Server is listening on :8080...")
   err:= http.ListenAndServe(":8080", mux)
   if err!=nil{
	fmt.Println(err)
   }
}
