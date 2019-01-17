#!/bin/bash

OPTIONS=$@

ansible-playbook -i hosts/win/ win.yml -l tag_os_windows ${OPTIONS}
test $? -ne 0 && exit 1

exit 0

