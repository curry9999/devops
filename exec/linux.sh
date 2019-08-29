#!/bin/bash

OPTIONS=$@
CURRENT_DIR=`pwd`
ANSIBLE_DIR=${CURRENT_DIR}/ansible/
CDK_DIR=cdk/linux/
METADATA=""
#METADATA="--path-metadata false --version-reporting false"

###############
# AWS Resource
###############
# Ansible
if [ ${OPTIONS} = "ansible" ]; then
  cd ${ANSIBLE_DIR}

  ansible-playbook -i hosts/prd/hosts.ini aws_linux.yml -l aws_linux
  test $? -ne 0 && exit 1

# AWS CDK
else

  cd ${CDK_DIR}

  npm install
  test $? -ne 0 && exit 1

  npm run build
  test $? -ne 0 && exit 1

  # destroy only
  if [ ${OPTIONS} = "d" ]; then
    cdk destroy -f
    test $? -ne 0 && exit 1
    exit 0
  fi

  cdk synth ${METADATA}
  test $? -ne 0 && exit 1

  cdk deploy -f ${METADATA}
  test $? -ne 0 && exit 1

  # create and destroy
  if [ ${OPTIONS} = "x" ]; then
    cdk destroy -f
    test $? -ne 0 && exit 1
  fi
fi

###############
# OS
###############
# deploy
if [ ${OPTIONS} = "os" ]; then
  cd ${ANSIBLE_DIR}

  ansible-playbook -i hosts/prd/ os_linux.yml --tags common -l tag_os_linux
  test $? -ne 0 && exit 1
fi

###############
# Final
###############
exit 0
