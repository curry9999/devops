import cdk = require('@aws-cdk/cdk');
import vpc = require('@aws-cdk/aws-ec2');

export class CdkStackVpc extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new vpc.CfnVPC(this, 'VPC', {
      cidrBlock: '10.1.1.0/24'
    });

  }
}