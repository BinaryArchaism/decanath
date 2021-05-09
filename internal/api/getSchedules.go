package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/BinaryArchaism/decanath/internal/config"
	"github.com/BinaryArchaism/decanath/internal/database"
	"net/http"
)

func GetSchedules(w http.ResponseWriter, r *http.Request) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Host, config.Port, config.User, config.Password, config.Dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	var stds = []database.Schedule{}
	result, err := db.Query("select sсhedules.id, sсhedules.cabinet, sсhedules.lecturer_id, sсhedules.subject_id, sсhedules.group_id, sсhedules.date, groups.cath_id from sсhedules, groups where sсhedules.group_id = groups.id")
	if err != nil {
		panic(err)
	}
	defer result.Close()

	for result.Next() {
		var std database.Schedule
		err := result.Scan(&std.Id, &std.Cabinet, &std.LecturerId, &std.SubjectId, &std.GroupId, &std.Date, &std.CathId)
		if err != nil {
			continue
		}
		stds = append(stds, std)
	}
	fmt.Println("getSchedules")
	jsonResponse, err := json.Marshal(stds)
	w.Write(jsonResponse)
}
