#!/bin/sh
TERRAFORM_VERSION=1.2.9

if terraform -v | grep -Eq v$TERRAFORM_VERSION
then
  which terraform
else
  TERRAFORM_DIR=/tmp/terraform_$TERRAFORM_VERSION
  if [ ! -f "${TERRAFORM_DIR}/terraform" ]; then
    wget https://releases.hashicorp.com/terraform/$TERRAFORM_VERSION/terraform_${TERRAFORM_VERSION}_linux_amd64.zip -q -P $TERRAFORM_DIR
    unzip -q ${TERRAFORM_DIR}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip -d  $TERRAFORM_DIR
    chmod +x ${TERRAFORM_DIR}/terraform
  fi
  echo  ${TERRAFORM_DIR}/terraform
fi
