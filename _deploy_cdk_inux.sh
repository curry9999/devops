#!/bin/bash

OPTIONS=$@

cd cdk

npm run build
test $? -ne 0 && exit 1

cdk synth
test $? -ne 0 && exit 1

cdk diff

cdk deploy
test $? -ne 0 && exit 1

cd ../

ansible-playbook -i hosts/prd/ os_linux.yml -l tag_os_linux ${OPTIONS}
test $? -ne 0 && exit 1

exit 0
