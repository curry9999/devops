#!/bin/bash

ansible-playbook -i hosts/aws/hosts.ini aws.yml -l prd
test $? -ne 0 && exit 1

exit 0
