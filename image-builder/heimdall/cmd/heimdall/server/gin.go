package server

import (
	"fmt"
	"net/http"
	"time"

	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/synthia-telemed/heimdall/cmd/heimdall/handler"
	_ "github.com/synthia-telemed/heimdall/docs"
	"github.com/synthia-telemed/heimdall/pkg/config"
)

func NewGINServer(cfg *config.Config, tokenHandler *handler.TokenHandler) *http.Server {
	gin.SetMode(cfg.GinMode)
	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(gin.LoggerWithConfig(gin.LoggerConfig{SkipPaths: []string{"/healthcheck"}}))
	router.Use(sentrygin.New(sentrygin.Options{
		Repanic: true,
	}))

	router.Use(handler.HTTPErrorHandler)
	router.GET("/healthcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success":   true,
			"timestamp": time.Now(),
		})
	})
	router.GET("/auth/body", tokenHandler.AuthenticateToken, tokenHandler.ParsePayload)
	router.GET("/auth/header", tokenHandler.AuthenticateToken, tokenHandler.ParsePayloadAndSetHeader)
	router.POST("/generate", tokenHandler.GenerateToken)
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	httpServer := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.GinPort),
		Handler: router,
	}

	return httpServer
}
