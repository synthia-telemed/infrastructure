package logger

import (
	"github.com/synthia-telemed/heimdall/pkg/config"
	"go.uber.org/zap"
)

func NewLogger(mode string) (logger *zap.Logger, err error) {
	if mode == config.ProductionMode {
		return zap.NewProduction()
	}
	return zap.NewDevelopment()
}
