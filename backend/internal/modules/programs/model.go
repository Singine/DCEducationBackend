package programs

type Program struct {
	ID           uint64 `db:"id"`
	UniversityID uint64 `db:"university_id"`
	MajorNameEN  string `db:"major_name_en"`
	MajorNameCN  string `db:"major_name_cn"`
	DegreeLevel  string `db:"degree_level"`
}
