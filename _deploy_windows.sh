#!/bin/bash

OPTIONS=$@

ansible-playbook -i hosts/aws/hosts.ini gen_cfn_template.yml -l prd ${OPTIONS}
test $? -ne 0 && exit 1

ansible-playbook -i hosts/aws/hosts.ini win_aws.yml -l prd ${OPTIONS}
test $? -ne 0 && exit 1

ansible-playbook -i hosts/win/ win_os.yml -l tag_os_windows ${OPTIONS}
test $? -ne 0 && exit 1

exit 0
