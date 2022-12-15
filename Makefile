sealsecrets:
	kubeseal --controller-name sealed-secrets -f k8s/backend/backend-api-secret.yaml -w k8s/backend/backend-api-secret-sealed.yaml
	kubeseal --controller-name sealed-secrets -f k8s/backend/patient/patient-api-secret.yaml -w k8s/backend/patient/patient-api-secret-sealed.yaml
	kubeseal --controller-name sealed-secrets -f k8s/backend/doctor/doctor-api-secret.yaml -w k8s/backend/doctor/doctor-api-secret-sealed.yaml
	kubeseal --controller-name sealed-secrets -f k8s/backend/measurement-result/measurement-result-secret.yaml -w k8s/backend/measurement-result/measurement-result-secret-sealed.yaml
	kubeseal --controller-name sealed-secrets -f k8s/heimdall/heimdall-secret.yaml -w k8s/heimdall/heimdall-secret-sealed.yaml
	kubeseal --controller-name sealed-secrets -f k8s/hospital-mock/hospital-mock-secret.yaml -w k8s/hospital-mock/hospital-mock-secret-sealed.yaml
	kubeseal --controller-name sealed-secrets -f k8s/rabbitmq/consumers/push-notification/secret.yaml -w k8s/rabbitmq/consumers/push-notification/secret-sealed.yaml
	kubeseal --controller-name sealed-secrets -f k8s/rabbitmq/consumers/push-notification/files-secret.yaml -w k8s/rabbitmq/consumers/push-notification/files-secret-sealed.yaml

