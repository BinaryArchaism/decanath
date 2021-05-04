package api

import (
	"io/ioutil"
	"net/http"
)

func SendJqueryJs(w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadFile("templates/js/jquery-3.6.0.min.js")
	if err != nil {
		http.Error(w, "Couldn't read file", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/javascript; charset=utf-8")
	w.Write(data)
}
