#!/bin/bash

OPTIONS=$@

ansible-playbook -i hosts/prd/hosts.ini aws_dms_endpoint.yml -l aws_linux ${OPTIONS}
test $? -ne 0 && exit 1

exit 0
