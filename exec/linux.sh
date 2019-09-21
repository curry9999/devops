#!/bin/bash

export OS=linux

if [ $# -eq 0 ]; then
  OPTION="cdk"
else
  OPTION=$1
fi

CURRENT_DIR=`pwd`
ANSIBLE_DIR=${CURRENT_DIR}/ansible/
CDK_DIR=cdk/${OS}/
METADATA=""
#METADATA="--path-metadata false --version-reporting false"

###############
# AWS Resource
###############
cd ${CDK_DIR}

npm install
test $? -ne 0 && exit 1

npm run build
test $? -ne 0 && exit 1

# destroy only
if [ ${OPTION} = "d" ]; then
  cdk destroy -f
  test $? -ne 0 && exit 1
  exit 0
fi

cdk synth ${METADATA}
test $? -ne 0 && exit 1

cdk deploy -f ${METADATA}
test $? -ne 0 && exit 1

# create and destroy
if [ ${OPTION} = "x" ]; then
  cdk destroy -f
  test $? -ne 0 && exit 1
  exit 0
fi

###############
# OS
###############
if [ ${OPTION} = "os" ]; then
  cd ${ANSIBLE_DIR}

  ansible-playbook -i hosts/prd/ os_${OS}.yml --tags common -l tag_os_${OS}
  test $? -ne 0 && exit 1
fi

###############
# Final
###############
exit 0
