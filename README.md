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
- exec
   - linux.sh
   - windows.sh

# execute file name
- linux.sh
   - Please set AWS authentication information with aws configure. 
   - Deploy CloudFormation using the AWS CDK or Ansible.
   - Operation confirmed OS
     - Ubuntu 18.04 LTS

- windows.sh
   - Please set AWS authentication information with aws configure. 
   - Operation confirmed OS
      - Windows Server 2019
      - Windows Server 2016
      - Windows Server 2012 R2
