package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)
func ifErr(err error){
	if err!=nil{
		panic(err)
	}
}
func main(){
	url := "http://vipul.com"
	fmt.Println("Web request practice :")

	response,err := http.Get(url)
	ifErr(err)
	defer response.Body.Close()

	fmt.Println("Response is of type :", response)

	databytes, err := ioutil.ReadAll(response.Body)
	ifErr(err)
	
	content := string(databytes)

	fmt.Println("Content is below \n",content)


}