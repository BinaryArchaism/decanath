package handlers

import (
	"github.com/BinaryArchaism/decanath/internal/api"
	"github.com/gorilla/mux"
	"net/http"
)

func Handle() {
	rtr := mux.NewRouter()
	rtr.HandleFunc("/", indexPage)
	rtr.HandleFunc("/statements", statementsPage)
	rtr.HandleFunc("/schedules", schedulesPage)
	rtr.HandleFunc("/internal/api/get_students", api.GetStudents)
	rtr.HandleFunc("/internal/api/get_groups", api.GetGroups)
	rtr.HandleFunc("/internal/api/get_lecturers", api.GetLecturers)
	rtr.HandleFunc("/internal/api/get_cathedras", api.GetCathedras)
	http.HandleFunc("/jquery.min.js", api.SendJqueryJs)
	fs := http.FileServer(http.Dir("./internal/templates"))
	http.Handle("/internal/templates/", http.StripPrefix("/internal/templates/", fs))
	http.Handle("/", rtr)
	http.ListenAndServe(":8080", nil)
}
