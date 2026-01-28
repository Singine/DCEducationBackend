package programs

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"backend/internal/response"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

func (h *Handler) SearchPost(c *gin.Context) {
	var req ProgramSearchRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid json body")
		return
	}

	level := strings.TrimSpace(req.DegreeLevel)
	if level == "" {
		level = "Bachelor"
	}

	page := req.Page
	size := req.Size
	if page <= 0 {
		page = 1
	}
	if size <= 0 {
		size = 20
	}

	items, total, err := h.svc.Search(c.Request.Context(), SearchParams{
		UniversityIDs: req.UniversityIDs,
		DegreeLevel:   level,
		Q:             req.Q,
		Page:          page,
		Size:          size,
	})
	if err != nil {
		response.ServerError(c, err.Error())
		return
	}

	dtoItems := make([]ProgramSearchItemDTO, 0, len(items))
	for _, p := range items {
		dtoItems = append(dtoItems, ProgramSearchItemDTO{
			ID:           p.ID,
			UniversityID: p.UniversityID,
			MajorNameCN:  p.MajorNameCN,
			DegreeLevel:  p.DegreeLevel,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    0,
		"message": "ok",
		"data": PagedResult[ProgramSearchItemDTO]{
			Page:  page,
			Size:  size,
			Total: total,
			Items: dtoItems,
		},
	})
}
