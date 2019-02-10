#!/bin/bash

OPTIONS=$@

ansible-playbook -i hosts/prd/hosts.ini win_aws.yml -l aws ${OPTIONS}
test $? -ne 0 && exit 1

ansible-playbook -i hosts/prd/ win_os.yml -l tag_os_windows ${OPTIONS}
test $? -ne 0 && exit 1

exit 0
