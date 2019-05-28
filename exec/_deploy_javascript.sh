#!/bin/bash

OPTIONS=$@
STACK_NAME=JavascriptStack
CDK_DIR=cdk/javascript/

cd ${CDK_DIR}

npm install
test $? -ne 0 && exit 1

cdk synth ${STACK_NAME}
test $? -ne 0 && exit 1

cdk deploy ${STACK_NAME} -f
test $? -ne 0 && exit 1

exit 0
