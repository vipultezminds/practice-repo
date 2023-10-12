---

# Server-Client Chat Application

A simple server-client chat application written in Go. This application allows clients to connect to a server and chat with each other. It also provides options for viewing chat history and retrieving unique users from the chat history.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Server](#server)
- [Client](#client)
- [Sample Usage](#sample-usage)

## Features

- Server can accept multiple client connections.
- Clients can chat with each other.
- Clients can view their chat history.
- Clients can retrieve unique users from the chat history.

## Prerequisites

Before running the application, make sure you have the following installed:

- Go (Programming Language) - [Download Go](https://golang.org/dl/)
- Git (optional for cloning the repository) - [Download Git](https://git-scm.com/downloads)

## Usage

### Server

1. Go to repository or download the source code:

    ```bash
     https://github.com/vipultezminds/practice-repo/tree/main/GoLang-Practice/023.multipleChatOptions

2. Compile and run the server:

    ```bash
    go run server.go
    ```

3. The server will start and listen for client connections on port 8080 by default.

### Client

1. Open a new terminal or command prompt.

2. Navigate to the `client` directory (if not already there).

3. Compile and run the client:

    ```bash
    go run client.go
    ```

4. The client application will start and connect to the server.

5. Follow the on-screen menu to choose options for viewing chat history, chatting with users, or retrieving unique users.

### Sample Usage

1. Start the server in one terminal:

    ```bash
    go run server.go
    ```

2. Start multiple client instances in separate terminals:

    ```bash
    go run client.go
    ```

3. Connect clients to the server and start chatting.

4. You can view chat history, chat with other connected users, or retrieve unique user names.

