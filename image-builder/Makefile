run:
	az acr login -n $(REGISTRY)
	docker build -t $(REGISTRY).azurecr.io/backend-api --platform=linux/amd64 backend-api/
	docker push $(REGISTRY).azurecr.io/backend-api
	docker build -t $(REGISTRY).azurecr.io/heimdall --platform=linux/amd64 heimdall/
	docker push $(REGISTRY).azurecr.io/heimdall
	docker build -t $(REGISTRY).azurecr.io/hospital-it-system-mock --platform=linux/amd64 hospital-it-system-mock/
	docker push $(REGISTRY).azurecr.io/hospital-it-system-mock
	docker build -t $(REGISTRY).azurecr.io/measurement-result-api --platform=linux/amd64 measurement-result-api/
	docker push $(REGISTRY).azurecr.io/measurement-result-api
	docker build -t $(REGISTRY).azurecr.io/push-notification-consumer --platform=linux/amd64 push-notification-consumer/
	docker push $(REGISTRY).azurecr.io/push-notification-consumer
	docker build -t $(REGISTRY).azurecr.io/socket-server --platform=linux/amd64 socket-server/
	docker push $(REGISTRY).azurecr.io/socket-server
