import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');

export class CdkStackEc2 extends cdk.Stack {
 constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
   super(scope, id, props);

   for (var i = 1; i <= 1; i++) {
      new ec2.CfnInstance(this, 'Ec2Instance' + i, {
          imageId: 'ami-07ad4b1c3af1ea214',
          instanceType: 't2.micro',
          keyName: 'kp_wai',
          networkInterfaces: [
            {
              deviceIndex: '0',
              associatePublicIpAddress: true
            }
          ]
        }
      );
    }

  }
}