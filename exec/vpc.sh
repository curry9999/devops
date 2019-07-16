#!/bin/bash

if [ $# -eq 0 ]; then
  OPTIONS="1"
else
  OPTIONS=$@
fi

CDK_DIR=cdk/vpc/
METADATA="--path-metadata false --version-reporting false"
CONTEXTDATA="-c count=${OPTIONS}"

###############
# CloudFormation
###############
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

cdk synth ${METADATA} ${CONTEXTDATA}
test $? -ne 0 && exit 1

cdk deploy -f ${METADATA} ${CONTEXTDATA}
test $? -ne 0 && exit 1

###############
# Final
###############
exit 0
