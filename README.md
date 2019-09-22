# devops
It contains code necessary for DevOps deployment.

# directory
- cdk
   - linux
- ansible
  - cfn
     - CloudFormation template
  - hosts
     - ansible inventory
  - roles
     - ansible roles
  - linux.sh
  - windows.sh
  - common.sh

# execute file name
- linux.sh
   - Please set AWS authentication information with aws configure. 
   - Deploy CloudFormation using the AWS CDK or Ansible.
   - Operation confirmed OS
     - Amazon Linux 2

- windows.sh
   - Please set AWS authentication information with aws configure. 
   - Operation confirmed OS
      - Windows Server 2019
