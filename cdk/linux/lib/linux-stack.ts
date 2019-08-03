import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

export class CdkStackEc2 extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    cdk.Tag.add(this, 'env', 'prd');
    cdk.Tag.add(this, 'os', 'linux');
    cdk.Tag.add(this, 'Name', 'prd-linux-ubuntu-1804');

    const cnt = this.node.tryGetContext("count");

    for (var i = 1; i <= cnt; i++) {
      new ec2.CfnInstance(this, 'Ec2Instance' + i, {
          imageId: this.node.tryGetContext("image_id"),
          instanceType: this.node.tryGetContext("instance_type"),
          keyName: this.node.tryGetContext("key_pair"),
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
