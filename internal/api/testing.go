package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func Testing(w http.ResponseWriter, r *http.Request) {
	fmt.Println("TEST")
	jsonResponse, _ := json.Marshal("fsdfsfsd")
	w.Write(jsonResponse)
}
