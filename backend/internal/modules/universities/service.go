package universities

import "context"

type Service struct {
	repo *Repo
}

func NewService(repo *Repo) *Service {
	return &Service{repo: repo}
}

func (s *Service) Search(ctx context.Context, p SearchParams) ([]University, int, error) {
	return s.repo.Search(ctx, p)
}

func (s *Service) GetByID(ctx context.Context, id uint64) (*University, error) {
	return s.repo.GetByID(ctx, id)
}
