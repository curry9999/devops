#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import regionInfo = require('@aws-cdk/region-info');

export class CdkStackEc2 extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cnt = this.node.tryGetContext("count");

    for (var i = 1; i <= cnt; i++) {
      new ec2.CfnInstance(this, 'Ec2Instance' + i, {
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

// Get the information for "eu-west-1":
const staticWebsite = regionInfo.Fact.find('ap-northeast-1', regionInfo.FactName.S3_STATIC_WEBSITE_ENDPOINT);

console.log("### AAA"); // s3-website.eu-west-1.amazonaws.com
regionInfo.Fact.register({
  region: 'bermuda-triangle-1',
  name: regionInfo.FactName.servicePrincipal('s3.amazonaws.com'),
  value: 's3-website.bermuda-triangle-1.nowhere.com',
});

console.log("### BBB"); // s3-website.eu-west-1.amazonaws.com
regionInfo.Fact.register({
  region: 'bermuda-triangle-1',
  name: regionInfo.FactName.servicePrincipal('s3.amazonaws.com'),
  value: 'ZZZs3-website.bermuda-triangle-1.nowhere.com',
},true);

// Access attributes:
console.log("############"); // s3-website.eu-west-1.amazonaws.com
console.log(staticWebsite); // s3-website.eu-west-1.amazonaws.com
console.log("############"); // s3-website.eu-west-1.amazonaws.com

new cdk.App();

//const app = new cdk.App();
//const inst = new CdkStackEc2(app, 'prd-ec2-linux');
//inst.node.applyAspect(new cdk.Tag('env', 'prd'));
//inst.node.applyAspect(new cdk.Tag('os', 'linux'));
//inst.node.applyAspect(new cdk.Tag('Name', 'prd-linux-ubuntu-1804'));
//app.synth();
