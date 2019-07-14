#!/bin/bash

CURRENT_DIR=`pwd`
ANSIBLE_DIR=${CURRENT_DIR}/ansible/
CDK_DIR=cdk/ec2/
METADATA="--path-metadata false --version-reporting false"

if [ $# -eq 0 ]; then
  OPTIONS="cdk"
else
  OPTIONS=$@
fi

###############
# CloudFormation
###############
# Ansible
if [ ${OPTIONS} = "ansible" ]; then
  cd ${ANSIBLE_DIR}

  ansible-playbook -i hosts/prd/hosts.ini aws_linux.yml -l aws_linux
  test $? -ne 0 && exit 1

else

# AWS CDK
  cd ${CDK_DIR}

  npm install
  test $? -ne 0 && exit 1

  npm run build
  test $? -ne 0 && exit 1

# remove
  if [ ${OPTIONS} = "x" ]; then
    cdk destroy -f
    exit 0
  fi

  cdk synth ${METADATA}
  test $? -ne 0 && exit 1

  cdk deploy -f ${METADATA}
  test $? -ne 0 && exit 1

fi

###############
# OS
###############
cd ${ANSIBLE_DIR}

ansible-playbook -i hosts/prd/ os_linux.yml --tags common -l tag_os_linux
test $? -ne 0 && exit 1

###############
# Final
###############
exit 0
