#!/bin/bash

OPTIONS=$@
CURRENT_DIR=`pwd`
ANSUBLE_DIR=${CURRENT_DIR}/ansible/
CDK_DIR=cdk/ec2/
METADATA="--path-metadata false --version-reporting false"

cd ${CDK_DIR}

npm install
test $? -ne 0 && exit 1

npm run build
test $? -ne 0 && exit 1

if [ ${OPTIONS} = "x" ]; then
 cdk destroy -f
 exit 0
fi

cdk synth ${METADATA}
test $? -ne 0 && exit 1

cdk deploy -f ${METADATA}
test $? -ne 0 && exit 1

cd ${ANSUBLE_DIR}

ansible-playbook -i hosts/prd/ os_linux.yml --tags common -l tag_os_linux
test $? -ne 0 && exit 1

exit 0
