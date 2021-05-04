package handlers

import (
	"database/sql"
	"fmt"
	"github.com/BinaryArchaism/decanath/internal/config"
	"github.com/BinaryArchaism/decanath/internal/database"
	"html/template"
	"net/http"
	"sort"
)

func indexPage(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/html/index.html", "templates/html/header.html", "templates/html/footer.html")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Host, config.Port, config.User, config.Password, config.Dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	var stds = []database.Student{}
	result, err := db.Query("select * from students")
	if err != nil {
		panic(err)
	}
	defer result.Close()

	for result.Next() {
		var std database.Student
		err := result.Scan(&std.Id, &std.FullName, &std.GroupId)
		if err != nil {
			continue
		}
		stds = append(stds, std)
	}
	sort.Slice(stds, func(i, j int) bool {
		return stds[i].GroupId < stds[j].GroupId
	})
	tmpl.ExecuteTemplate(w, "index", stds)
}
