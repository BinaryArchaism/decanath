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
