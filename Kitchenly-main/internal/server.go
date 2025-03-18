package internal

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewServer(

) *echo.Echo {
	e := echo.New()

	// Setup Routes
	AddRoutes(e)
	// Setup Middleware
	e.Logger.SetLevel(log.DEBUG)
	e.Use(middleware.Logger())
	e.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey: []byte(handler.Key),
		Skipper: func(c echo.Context) bool {
			// Skip authentication for register and login requests
			if c.Path() == "/login" || c.Path() == "/register" {
				return true
			}
			return false
		},
	}))


	return &e
}