package api

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func SetMark(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}
	studentName := string(body)
	for _, w := range body {
		fmt.Print(string(w))
	}
	fmt.Println(studentName)
}
