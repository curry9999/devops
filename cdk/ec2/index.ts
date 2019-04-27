#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');

export class CdkStackEc2 extends cdk.Stack {
  constructor(scope: cdk.App, id: string, cnt: number = 1 , props?: cdk.StackProps) {
    super(scope, id, props);

    for (var i = 1; i <= cnt; i++) {
      new ec2.CfnInstance(this, 'Instance' + i, {
          imageId: this.node.getContext("image_id"),
          instanceType: this.node.getContext("instance_type"),
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
const inst = new CdkStackEc2(app, 'prd-ec2-linux');
inst.node.apply(new cdk.Tag('env', 'prd'));
inst.node.apply(new cdk.Tag('Name', 'prd-linux-ubuntu-1804'));
inst.node.apply(new cdk.Tag('os', 'linux'));
app.run();
