package handlers

import (
	"github.com/gorilla/mux"
	"net/http"
)

func Handle() {
	rtr := mux.NewRouter()
	rtr.HandleFunc("/", indexPage)
	//rtr.HandleFunc("/schedules", schedulesPage)
	//rtr.HandleFunc("/statements", statementsPage)
	//rtr.HandleFunc("/list_lecturer", lecturerPage)
	//rtr.HandleFunc("/list_cathedras", cathedrasPage)
	//rtr.HandleFunc("/api/get_groups", api.GetGroups)
	//rtr.HandleFunc("/jquery.min.js", api.SendJqueryJs)
	//fs := http.FileServer(http.Dir("./templates"))
	//http.Handle("/templates/", http.StripPrefix("/templates/", fs))
	fs := http.FileServer(http.Dir("./templates/html"))
	http.Handle("/templates/", http.StripPrefix("/templates/", fs))
	http.Handle("/", rtr)
	http.ListenAndServe(":8080", nil)
}
