package programs

import (
	"context"
	"fmt"
	"strings"

	"github.com/jmoiron/sqlx"
)

type Repo struct {
	db *sqlx.DB
}

func NewRepo(db *sqlx.DB) *Repo {
	return &Repo{db: db}
}

type SearchParams struct {
	UniversityIDs []uint64
	DegreeLevel   string
	Q             string
	Page          int
	Size          int
}

func (r *Repo) Search(ctx context.Context, p SearchParams) ([]Program, int, error) {
	if p.Page <= 0 {
		p.Page = 1
	}
	if p.Size <= 0 || p.Size > 100 {
		p.Size = 20
	}
	offset := (p.Page - 1) * p.Size

	where := []string{"1=1"}
	args := map[string]interface{}{}

	if len(p.UniversityIDs) > 0 {
		where = append(where, "university_id IN (:university_ids)")
		args["university_ids"] = p.UniversityIDs
	}
	if level := strings.TrimSpace(p.DegreeLevel); level != "" {
		where = append(where, "LOWER(degree_level) = LOWER(:degree_level)")
		args["degree_level"] = level
	}
	if q := strings.TrimSpace(p.Q); q != "" {
		where = append(where, "(major_name_cn LIKE :q OR major_name_en LIKE :q)")
		args["q"] = "%" + q + "%"
	}

	whereSQL := strings.Join(where, " AND ")

	countSQL := fmt.Sprintf("SELECT COUNT(*) FROM programs WHERE %s", whereSQL)
	namedCountSQL, namedCountArgs, err := sqlx.Named(countSQL, args)
	if err != nil {
		return nil, 0, err
	}
	inCountSQL, inCountArgs, err := sqlx.In(namedCountSQL, namedCountArgs...)
	if err != nil {
		return nil, 0, err
	}
	inCountSQL = r.db.Rebind(inCountSQL)

	countStmt, err := r.db.PreparexContext(ctx, inCountSQL)
	if err != nil {
		return nil, 0, err
	}
	defer countStmt.Close()

	var total int
	if err := countStmt.GetContext(ctx, &total, inCountArgs...); err != nil {
		return nil, 0, err
	}

	listSQL := fmt.Sprintf(`
SELECT id, university_id, major_name_en, major_name_cn, degree_level
FROM programs
WHERE %s
ORDER BY university_id, major_name_cn
LIMIT %d OFFSET %d
`, whereSQL, p.Size, offset)

	namedListSQL, namedListArgs, err := sqlx.Named(listSQL, args)
	if err != nil {
		return nil, 0, err
	}
	inListSQL, inListArgs, err := sqlx.In(namedListSQL, namedListArgs...)
	if err != nil {
		return nil, 0, err
	}
	inListSQL = r.db.Rebind(inListSQL)

	listStmt, err := r.db.PreparexContext(ctx, inListSQL)
	if err != nil {
		return nil, 0, err
	}
	defer listStmt.Close()

	var items []Program
	if err := listStmt.SelectContext(ctx, &items, inListArgs...); err != nil {
		return nil, 0, err
	}

	return items, total, nil
}
