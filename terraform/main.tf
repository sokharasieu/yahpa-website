provider "aws" {
  region = "us-east-2"
}

resource "aws_ecr_repository" "yahpa-website" {
  name                 = "yahpa-website"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
}

output "repository_url" {
  value = aws_ecr_repository.yahpa-website.repository_url
}
