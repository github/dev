package handler

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	DB: db
}

func (h *Handler) 