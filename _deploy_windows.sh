#!/bin/bash

OPTIONS=$@

ansible-playbook -i hosts/prd/hosts.ini aws_win.yml -l aws_win ${OPTIONS}
test $? -ne 0 && exit 1

ansible-playbook -i hosts/prd/ os_win.yml -l tag_os_windows ${OPTIONS}
test $? -ne 0 && exit 1

exit 0
