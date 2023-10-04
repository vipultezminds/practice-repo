package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/html")

    if r.URL.Path == "/" {
        fmt.Fprintf(w, "<h1>Hello! World</h1>")
        fmt.Fprintf(w, `<br><a href="/vipul">Portfolio</a>`)
    } else {
        fs := http.FileServer(http.Dir("MyPortfolio"))
        http.StripPrefix("/vipul", fs).ServeHTTP(w, r)
    }
}

func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("/", handler)

    fmt.Println("Server requested on port on :8080...")
    err := http.ListenAndServe(":8080", mux)
    if err!=nil{
        panic(err)
    }
    
}



// package main

// import (
//     "fmt"
//     "net/http"
// )

// func handler(w http.ResponseWriter, r *http.Request) {
//     // Set response headers
//     w.Header().Set("Content-Type", "text/plain")

//     // Write the response body
//     fmt.Fprintf(w, "Hello, World!")

//     // Set the HTTP status code (optional)
//     w.WriteHeader(http.StatusOK)
// }

// func main() {
//     mux := http.NewServeMux()
//     mux.HandleFunc("/", handler)

//     // Start the HTTP server on port 8080
//     fmt.Println("Server is listening on :8080...")
//     http.ListenAndServe(":8080", mux)
// }

