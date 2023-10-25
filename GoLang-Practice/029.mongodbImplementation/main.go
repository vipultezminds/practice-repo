package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Person struct {
	Name  string
	Age   int
	Email string
}

func main() {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI("mongodb+srv://vipul:vipulsingh@cluster0.vhn5ukz.mongodb.net/test1?retryWrites=true&w=majority").SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		panic(err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")

	// Insert data into MongoDB
	collection := client.Database("test1").Collection("persons")

	// Define the data you want to insert
	person := Person{
		Name:  "John Doe",
		Age:   30,
		Email: "john.doe@example.com",
	}

	// Insert one document
	insertResult, err := collection.InsertOne(context.TODO(), person)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Inserted document ID: %v\n", insertResult.InsertedID)
}
