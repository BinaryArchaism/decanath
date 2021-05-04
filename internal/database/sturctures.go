package database

type Lecturer struct {
	Fio string
}

type Student struct {
	Id       uint   `json:"id"`
	GroupId  uint   `json:"groupid"`
	FullName string `json:"FIO"`
}
type Students struct {
	Students []Student `json:"students"`
}
