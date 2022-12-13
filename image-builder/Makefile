run:
	docker build -t $(REGISTRY)/backend-api --platform=linux/amd64 backend-api/
	docker push $(REGISTRY)/backend-api
	docker build -t $(REGISTRY)/heimdall --platform=linux/amd64 heimdall/
	docker push $(REGISTRY)/heimdall
	docker build -t $(REGISTRY)/hospital-it-system-mock --platform=linux/amd64 hospital-it-system-mock/
	docker push $(REGISTRY)/hospital-it-system-mock
	docker build -t $(REGISTRY)/measurement-result-api --platform=linux/amd64 measurement-result-api/
	docker push $(REGISTRY)/measurement-result-api
	docker build -t $(REGISTRY)/push-notification-consumer --platform=linux/amd64 push-notification-consumer/
	docker push $(REGISTRY)/push-notification-consumer
	docker build -t $(REGISTRY)/socket-server --platform=linux/amd64 socket-server/
	docker push $(REGISTRY)/socket-server
