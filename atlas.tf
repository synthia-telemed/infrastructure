provider "mongodbatlas" {
  public_key  = var.mongoatlas_public_key
  private_key = var.mongoatlas_private_key
}

resource "mongodbatlas_project" "project" {
  name   = var.project_name
  org_id = var.mongoatlas_org_id
}

resource "mongodbatlas_cluster" "cluster" {
  project_id                  = mongodbatlas_project.project.id
  name                        = "${mongodbatlas_project.project.name}_cluster"
  provider_name               = var.mongoatlas_cluster_config.provider
  provider_region_name        = var.mongoatlas_cluster_config.region
  provider_instance_size_name = var.mongoatlas_cluster_config.size
  mongo_db_major_version      = var.mongoatlas_cluster_config.version

}

resource "mongodbatlas_database_user" "admin_user" {
  username           = var.mongoatlas_admin_username
  password           = var.mongoatlas_admin_password
  project_id         = mongodbatlas_project.project.id
  auth_database_name = "admin"
  roles {
    role_name     = "atlasAdmin"
    database_name = "admin"
  }
}

resource "mongodbatlas_project_ip_access_list" "ip_access_list" {
  project_id = mongodbatlas_project.project.id
  cidr_block = var.mongoatlas_cidr_access_list
}
