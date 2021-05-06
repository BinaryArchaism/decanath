package handlers

import (
	"html/template"
	"net/http"
)

func groupsPage(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("internal/templates/html/groups.html", "internal/templates/html/header.html", "internal/templates/html/footer.html")
	tmpl.ExecuteTemplate(w, "groups", nil)
}
