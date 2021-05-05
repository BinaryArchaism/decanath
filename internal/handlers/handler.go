package handlers

import (
	"github.com/BinaryArchaism/decanath/internal/api"
	"github.com/gorilla/mux"
	"net/http"
)

func Handle() {
	rtr := mux.NewRouter()
	rtr.HandleFunc("/", indexPage)
	rtr.HandleFunc("/schedules", schedulesPage)
	//rtr.HandleFunc("/statements", statementsPage)
	//rtr.HandleFunc("/list_lecturer", lecturerPage)
	//rtr.HandleFunc("/list_cathedras", cathedrasPage)
	rtr.HandleFunc("/api/get_groups", api.GetGroups)
	http.HandleFunc("/jquery.min.js", api.SendJqueryJs)
	fs := http.FileServer(http.Dir("./templates"))
	http.Handle("internal/templates/", http.StripPrefix("internal/templates/", fs))
	http.Handle("/", rtr)
	http.ListenAndServe(":8080", nil)

}
