#!/bin/bash

OPTIONS=$@
STACK_NAME=prd-ec2-linux
CURRENT_DIR=`pwd`
CDK_DIR=cdk/ec2/

cd ${CDK_DIR}

npm install
test $? -ne 0 && exit 1

npm run build
test $? -ne 0 && exit 1

cdk synth ${STACK_NAME} --path-metadata false --version-reporting false
test $? -ne 0 && exit 1

cdk deploy ${STACK_NAME} -f --path-metadata false --version-reporting false
test $? -ne 0 && exit 1

cd ${CURRENT_DIR}

ansible-playbook -i hosts/prd/ os_linux.yml --tags common -l tag_os_linux ${OPTIONS}
test $? -ne 0 && exit 1

exit 0
