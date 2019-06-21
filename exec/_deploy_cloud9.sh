#!/bin/bash

OPTIONS=$@
STACK_NAME=prd-cloud9
CDK_DIR=cdk/cloud9/

cd ${CDK_DIR}

npm install
test $? -ne 0 && exit 1

npm run build
test $? -ne 0 && exit 1

cdk synth ${STACK_NAME}
test $? -ne 0 && exit 1

cdk deploy ${STACK_NAME} -f
test $? -ne 0 && exit 1

exit 0
