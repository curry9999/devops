#!/bin/bash

OPTIONS=$@
STACK_NAME=prd-iam
CDK_DIR=cdk/ts-node/

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
