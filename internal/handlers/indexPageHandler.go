package handlers

import (
	"html/template"
	"net/http"
)

func indexPage(w http.ResponseWriter, r *http.Request) {
	//tmpl, _ := template.ParseFiles("templates/html/index.html", "templates/html/header.html", "templates/html/footer.html")
	tmpl, _ := template.ParseFiles("templates/html/base.html")

	//db := database.ConnectToDB()
	//
	//var stds = []database.Student{}
	//result, err := db.Query("select * from students")
	//if err != nil {	panic(err) }
	//defer result.Close()
	//
	//for result.Next() {
	//	var std database.Student
	//	err := result.Scan(&std.Id, &std.FullName, &std.GroupId)
	//	if err != nil { continue }
	//	stds = append(stds, std)
	//}
	//sort.Slice(stds, func(i, j int) bool {
	//	return stds[i].GroupId < stds[j].GroupId
	//})
	tmpl.ExecuteTemplate(w, "base", nil)
}
