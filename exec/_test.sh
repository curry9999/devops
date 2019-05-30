#!/bin/bash

OPTIONS=$@
STACK_NAME=prd-iam
CDK_DIR=cdk/iam/

cd ${CDK_DIR}

npm install
test $? -ne 0 && exit 1

npm run build
test $? -ne 0 && exit 1

echo "*** all"
cdk synth ${STACK_NAME}
test $? -ne 0 && exit 1

echo "*** remove path metadata"
cdk synth ${STACK_NAME} --path-metadata false
test $? -ne 0 && exit 1

echo "*** remove AWS::CDK::Metadata"
cdk synth ${STACK_NAME} --version-reporting false
test $? -ne 0 && exit 1

echo "*** none"
cdk synth ${STACK_NAME} --path-metadata false --version-reporting false
test $? -ne 0 && exit 1

exit 0
