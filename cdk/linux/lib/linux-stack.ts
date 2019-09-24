import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

export class CdkStackEc2 extends cdk.Stack {
  private addTag(name: string, value: string) {
    cdk.Tag.add(this, name, value);
  };

  private getContext(name: string): string {
    return this.node.tryGetContext(name);
  }

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const env = this.getContext("env");
    const ami = new ec2.AmazonLinuxImage().getImage(this);
    const instance_type = new ec2.InstanceType(this.getContext("instance_type")).toString();

    new ec2.CfnInstance(this, 'Instance', {
        imageId: ami.imageId,
        instanceType: instance_type,
        keyName: this.getContext("key_pair"),
        networkInterfaces: [
          { deviceIndex: '0', associatePublicIpAddress: true }
        ]
      }
    );

    this.addTag('env', env);
    this.addTag('os', 'linux');
    this.addTag('Name', 'Amazon Linux 2');
  }
}
