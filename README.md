# devops
It contains code necessary for DevOps deployment.

# directory
- cdk
   - AWS CDK
- cfn
   - CloudFormation template
- exec
   - Execute file name
- hosts
   - ansible inventory
- roles
   - ansible roles

# execute file name
- _deploy_aws.sh
   - Please set AWS authentication information with aws configure. 

- _deploy_cdk_inux.sh
   - Please set AWS authentication information with aws configure. 
   - Deploy CloudFormation using the AWS CDK.
   - Operation confirmed OS
     - Ubuntu 18.04 LTS

- _deploy_cloud9.sh
   - Please set AWS authentication information with aws configure. 
   - Deploy CloudFormation using the AWS CDK.
   - AWS cloud9 starts on EC2 basis.

- _deploy_linux.sh
   - Please set AWS authentication information with aws configure. 
   - Operation confirmed OS
     - Ubuntu 18.04 LTS

- _deploy_windows.sh
   - Please set AWS authentication information with aws configure. 
   - Operation confirmed OS
      - Windows Server 2019
      - Windows Server 2016
      - Windows Server 2012 R2
