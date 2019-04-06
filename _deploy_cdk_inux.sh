#!/bin/bash

OPTIONS=$@
STACK_NAME=prd-ec2-linux

cd cdk

npm run build
test $? -ne 0 && exit 1

cdk synth ${STACK_NAME}
test $? -ne 0 && exit 1

#cdk diff ${STACK_NAME}

cdk deploy ${STACK_NAME} -f
test $? -ne 0 && exit 1

cd ../

ansible-playbook -i hosts/prd/ os_linux.yml -l tag_os_linux ${OPTIONS}
test $? -ne 0 && exit 1

exit 0


