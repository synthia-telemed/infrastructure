package grpc

import (
	"context"
	"time"

	"github.com/getsentry/sentry-go"
	pb "github.com/synthia-telemed/heimdall/cmd/heimdall/proto"
	"github.com/synthia-telemed/heimdall/pkg/config"
	"github.com/synthia-telemed/heimdall/pkg/token"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func NewTokenServer(logger *zap.SugaredLogger, tokenMng token.Manager, validTime time.Duration) *TokenServer {
	return &TokenServer{
		logger:       logger,
		tokenManager: tokenMng,
		validTime:    validTime,
	}
}

type TokenServer struct {
	pb.UnimplementedTokenServer
	logger       *zap.SugaredLogger
	tokenManager token.Manager
	validTime    time.Duration
}

func (s TokenServer) GenerateToken(_ context.Context, tokenReq *pb.GenerateTokenRequest) (*pb.TokenResponse, error) {
	err := tokenReq.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	payload := config.Payload{
		CustomPayload: config.CustomPayload{
			UserID: tokenReq.UserID,
			Role:   tokenReq.Role,
		},
		MetadataPayload: config.MetadataPayload{
			IssuedAt:  time.Now().UTC(),
			ExpiredAt: time.Now().Add(s.validTime).UTC(),
		},
	}
	tokenString, err := s.tokenManager.Generate(payload)
	if err != nil {
		sentry.WithScope(func(scope *sentry.Scope) {
			scope.SetExtra("payload", payload)
			sentry.CaptureException(err)
		})
		s.logger.Errorw("s.tokenManager.Generate error", "error", err, "payload", payload)
		return nil, status.Error(codes.Internal, "Failed to generate token string")
	}
	return &pb.TokenResponse{Token: tokenString}, nil
}
