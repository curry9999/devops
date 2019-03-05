import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');

export class CdkStack extends cdk.Stack {
 constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
   super(scope, id, props);

   for (var i = 1; i <= 2; i++) {
      new ec2.CfnInstance(this, 'LinuxInstance' + i, {
          imageId: 'ami-07ad4b1c3af1ea214',
          instanceType: 't2.micro',
          keyName: 'kp_wai',
          monitoring: false,
          networkInterfaces: [
            {
              deviceIndex: "0",
              associatePublicIpAddress: true,
              subnetId: 'subnet-09fe229ff896761aa'
            }
          ]
        }
      );
    }

    for (var i = 1; i <= 2; i++) {
      new ec2.CfnInstance(this, 'WindowsInstance' + i, {
          imageId: 'ami-071e5cd29f6f7eeba',
          instanceType: 't2.micro',
          keyName: 'kp_wai',
          monitoring: false,
          networkInterfaces: [
            {
              deviceIndex: "0",
              associatePublicIpAddress: true,
              subnetId: 'subnet-09fe229ff896761aa'
            }
          ]
        }
      );
    }

  }
}