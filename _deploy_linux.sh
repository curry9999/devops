#!/bin/bash

OPTIONS=$@

ansible-playbook -i hosts/prd/hosts.ini aws_linux.yml -l aws_linux ${OPTIONS}
test $? -ne 0 && exit 1

ansible-playbook -i hosts/prd/ os_linux.yml -l tag_os_linux ${OPTIONS}
test $? -ne 0 && exit 1

exit 0



