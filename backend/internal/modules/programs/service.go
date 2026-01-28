package programs

import "context"

type Service struct {
	repo *Repo
}

func NewService(repo *Repo) *Service {
	return &Service{repo: repo}
}

func (s *Service) Search(ctx context.Context, p SearchParams) ([]Program, int, error) {
	return s.repo.Search(ctx, p)
}
