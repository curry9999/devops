#!/bin/bash

OPTIONS=$@
CURRENT_DIR=`pwd`
ANSIBLE_DIR=${CURRENT_DIR}/ansible/

###############
# AWS Resource
###############
cd ${ANSIBLE_DIR}
ansible-playbook -i hosts/prd/hosts.ini aws_win.yml -l aws_win ${OPTIONS}
test $? -ne 0 && exit 1

###############
# OS
###############
#cd ${ANSIBLE_DIR}
#ansible-playbook -i hosts/prd/ os_win.yml -l tag_os_windows ${OPTIONS}
#test $? -ne 0 && exit 1

###############
# Final
###############
exit 0
