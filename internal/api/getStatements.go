package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/BinaryArchaism/decanath/internal/config"
	"github.com/BinaryArchaism/decanath/internal/database"
	"net/http"
	"strconv"
)

func GetStatements(w http.ResponseWriter, r *http.Request) {
	groupId, err := strconv.Atoi(r.URL.Query()["group"][0])
	subjectId, err := strconv.Atoi(r.URL.Query()["subject"][0])

	fmt.Println(groupId)
	fmt.Println(subjectId)

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Host, config.Port, config.User, config.Password, config.Dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	var stds = database.Statement{}
	var query = fmt.Sprintf("select c.number, l.fio, subjects.title, s.date, s2.title\nFROM subjects\nJOIN schedules s on subjects.id = s.subject_id\nJOIN lecturer l on s.lecturer_id = l.id\nJOIN groups g on s.group_id = g.id\nJOIN students s2 on g.id = s2.group_id\nJOIN cathedras c on g.cath_id = c.id\nWHERE subject_id = %d and s.group_id = %d", subjectId, groupId)
	fmt.Println(query)
	students, err := db.Query(query)
	//students, err := db.Query("select c.number, l.fio, subjects.title, s.date, s2.title, m.value\nFROM subjects\nJOIN schedules s on subjects.id = s.subject_id\nJOIN lecturer l on s.lecturer_id = l.id\nJOIN groups g on s.group_id = g.id\nJOIN students s2 on g.id = s2.group_id\nJOIN cathedras c on g.cath_id = c.id\nJOIN marks m on s2.id = m.student_id and subjects.id = m.subject_id")
	if err != nil {
		panic(err)
	}
	query = fmt.Sprintf("select value from marks, students where (students.group_id = %d and student_id = students.id) and subject_id = %d", groupId, subjectId)
	fmt.Println(query)
	marks, err := db.Query(query)
	if err != nil {
		panic(err)
	}
	defer students.Close()
	
	for students.Next() {
		var mark uint
		err := marks.Scan(&mark)
		if err == nil {
			stds.MarksList = append(stds.MarksList, mark)
		}

		var std string
		err = students.Scan(&std)
		if err == nil {
			stds.StudentsList = append(stds.StudentsList, std)
		}
	}

	fmt.Println("getStatements")
	jsonResponse, err := json.Marshal(stds)
	w.Write(jsonResponse)
}
