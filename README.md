# devops
It contains code necessary for DevOps deployment.

# directory
- cdk
   - cloud9
   - dynamodb
   - ec2
   - iam
   - javascript
   - ts-node
   - vpc
- ansible
  - cfn
     - CloudFormation template
  - exec
     - Execute file name
  - hosts
     - ansible inventory
  - roles
     - ansible roles

# execute file name
- linux.sh
   - Please set AWS authentication information with aws configure. 
   - Deploy CloudFormation using the AWS CDK or Ansible.
   - Operation confirmed OS
     - Ubuntu 18.04 LTS

- vpc.sh
   - Deploy CloudFormation using the AWS CDK.

- windows.sh
   - Please set AWS authentication information with aws configure. 
   - Operation confirmed OS
      - Windows Server 2019
      - Windows Server 2016
      - Windows Server 2012 R2
