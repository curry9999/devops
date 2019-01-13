#!/bin/bash

ansible-playbook -i hosts/aws/hosts.ini aws.yml -l prd
test $? -ne 0 && exit 1

ansible-playbook -i hosts/win/ win.yml -l tag_os_windows
test $? -ne 0 && exit 1

exit 0