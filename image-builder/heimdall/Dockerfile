FROM golang:1.18-alpine as builder
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY ./ ./
RUN go build -o heimdall cmd/heimdall/main.go

FROM alpine:3
WORKDIR /app
COPY ./ ./
COPY --from=builder /app/heimdall ./bin/heimdall
ENTRYPOINT ["/app/bin/heimdall"]