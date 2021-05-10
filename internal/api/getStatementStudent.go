package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/BinaryArchaism/decanath/internal/config"
	"github.com/BinaryArchaism/decanath/internal/database"
	"io/ioutil"
	"log"
	"net/http"
)

func GetStatementStudent(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}
	studentName := string(body)
	studentName = studentName[2 : len(studentName)-2]

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Host, config.Port, config.User, config.Password, config.Dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	var stdsWithoutMarks = []database.Statement{}
	var query = fmt.Sprintf("select c.number, l.fio, s2.title, s.date, students.title, 0\n"+
		"from students\n"+
		"join groups g on students.group_id = g.id\n"+
		"join schedules s on g.id = s.group_id\n"+
		"join lecturer l on s.lecturer_id = l.id\n"+
		"join cathedras c on g.cath_id = c.id\n"+
		"join subjects s2 on s.subject_id = s2.id\n"+
		"where students.title = '%s'", studentName)

	studentsWithoutMarks, err := db.Query(query)
	if err != nil {
		panic(err)
	}
	defer studentsWithoutMarks.Close()

	for studentsWithoutMarks.Next() {
		var std database.Statement
		err := studentsWithoutMarks.Scan(&std.Cath, &std.Fio, &std.SubjectName, &std.Date, &std.StudentsList, &std.MarksList)
		if err != nil {
			continue
		}
		stdsWithoutMarks = append(stdsWithoutMarks, std)
	}

	var stdsWithMarks = []database.Statement{}
	query = fmt.Sprintf("select c.number, l.fio, s2.title, s.date, students.title, m.value\n"+
		"from students\n"+
		"join groups g on g.id = students.group_id\n"+
		"join schedules s on g.id = s.group_id\n"+
		"join cathedras c on c.id = g.cath_id\n"+
		"join lecturer l on l.id = s.lecturer_id\n"+
		"join subjects s2 on s.subject_id = s2.id\n"+
		"join marks m on students.id = m.student_id and m.subject_id = s.subject_id\n"+
		"where students.title = '%s'", studentName)

	studentsWithMarks, err := db.Query(query)
	if err != nil {
		panic(err)
	}
	defer studentsWithMarks.Close()

	for studentsWithMarks.Next() {
		var std database.Statement
		err := studentsWithMarks.Scan(&std.Cath, &std.Fio, &std.SubjectName, &std.Date, &std.StudentsList, &std.MarksList)
		if err != nil {
			continue
		}
		stdsWithMarks = append(stdsWithMarks, std)
	}

	for k, i := range stdsWithoutMarks {
		for p, j := range stdsWithMarks {
			if i.SubjectName == j.SubjectName {
				stdsWithoutMarks[k].MarksList = stdsWithMarks[p].MarksList
			}
		}
	}
	fmt.Println("getStatementStudent ")
	jsonResponse, err := json.Marshal(stdsWithoutMarks)
	w.Write(jsonResponse)
}