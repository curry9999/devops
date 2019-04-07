#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');

export class CdkStackEc2 extends cdk.Stack {
  constructor(scope: cdk.App, id: string, cnt: number = 1 , props?: cdk.StackProps) {
    super(scope, id, props);

    for (var i = 1; i <= cnt; i++) {
      new ec2.CfnInstance(this, 'Ec2Instance' + i, {
          imageId: 'ami-07ad4b1c3af1ea214',
          instanceType: 't2.micro',
          keyName: this.node.getContext("key_pair"),
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

const app = new cdk.App();
const prd = new CdkStackEc2(app, 'prd-ec2-linux');
prd.node.apply(new cdk.Tag('env', 'prd'));
prd.node.apply(new cdk.Tag('Name', 'prd-linux-ubuntu-1804'));
prd.node.apply(new cdk.Tag('os', 'linux'));
app.run();
