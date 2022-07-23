resource "helm_release" "argocd" {
  name             = "argocd"
  namespace        = "argocd"
  create_namespace = true
  repository       = "https://charts.bitnami.com/bitnami"
  chart            = "argo-cd"
  version          = "3.4.5"

  set {
    name  = "server.insecure"
    value = "true"
  }
}

data "kubectl_file_documents" "argocd-repo-secret" {
  content = file("synthia-infrastructure-repo-secret-sealed.yaml")
}

resource "kubectl_manifest" "argocd-repo-secret" {
  for_each  = data.kubectl_file_documents.argocd-repo-secret.manifests
  yaml_body = each.value
  depends_on = [
    helm_release.argocd
  ]
}

// ArgoCD Applications
data "kubectl_path_documents" "argocd-apps" {
  pattern = "./argocd/*.yaml"
}

resource "kubectl_manifest" "argocd-apps" {
  override_namespace = helm_release.argocd.namespace
  for_each           = toset(data.kubectl_path_documents.argocd-apps.documents)
  yaml_body          = each.value
  depends_on = [
    helm_release.argocd,
    kubectl_manifest.argocd-repo-secret
  ]
}
