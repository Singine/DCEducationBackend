package programs

type ProgramSearchRequest struct {
	UniversityIDs []uint64 `json:"university_ids"`
	DegreeLevel   string   `json:"degree_level"`
	Q             string   `json:"q"`
	Page          int      `json:"page"`
	Size          int      `json:"size"`
}

type ProgramSearchItemDTO struct {
	ID           uint64 `json:"id"`
	UniversityID uint64 `json:"university_id"`
	MajorNameCN  string `json:"major_name_cn"`
	DegreeLevel  string `json:"degree_level"`
}

type PagedResult[T any] struct {
	Page  int `json:"page"`
	Size  int `json:"size"`
	Total int `json:"total"`
	Items []T `json:"items"`
}
