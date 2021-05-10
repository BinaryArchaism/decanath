package database

type Lecturer struct {
	Id  uint   `json:"id"`
	Fio string `json:"fio"`
}
type Lecturers struct {
	Lecturers []Lecturer `json:"lecturers"`
}

type Student struct {
	Id       uint   `json:"id"`
	GroupId  uint   `json:"groupid"`
	FullName string `json:"FIO"`
}
type Students struct {
	Students []Student `json:"students"`
}

type Group struct {
	Id     uint `json:"id"`
	Number uint `json:"number"`
	CathId uint `json:"cath_id"`
}
type Groups struct {
	Groups []Group `json:"groups"`
}

type Cathedra struct {
	Id     uint   `json:"id"`
	Title  string `json:"title"`
	Number uint   `json:"number"`
}
type Cathedras struct {
	Cathedras []Cathedra `json:"cathedras"`
}

type Schedule struct {
	Id         uint   `json:"id"`
	Cabinet    uint   `json:"cabinet"`
	LecturerId uint   `json:"lecturer_id"`
	SubjectId  uint   `json:"subject_id"`
	GroupId    uint   `json:"group_id"`
	Date       string `json:"date"`
	CathId     uint   `json:"cath_id"`
}
type Schedules struct {
	Schedules []Schedule `json:"schedules"`
}

type Subject struct {
	Id         uint   `json:"id"`
	Title      string `json:"title"`
	TimeAmount uint   `json:"time_amount"`
}
type Subjects struct {
	Subjects []Subject `json:"subjects"`
}

type Mark struct {
	Value     uint `json:"value"`
	StudentId uint `json:"student_id"`
	SubjectId uint `json:"subject_id"`
	FIO       string
}
type Marks struct {
	Marks []Mark `json:"marks"`
}

type Statement struct {
	Cath         uint   `json:"cath"`
	Fio          string `json:"fio"`
	SubjectName  string `json:"subject_name"`
	Date         string `json:"date"`
	StudentsList string `json:"students_list"`
	MarksList    uint   `json:"marks_list"`
}
