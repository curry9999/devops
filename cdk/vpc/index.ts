#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

export class CdkStackVpc extends cdk.Stack {
  constructor(scope: cdk.App, id: string , props?: cdk.StackProps) {
    super(scope, id, props);

    new ec2.Vpc(this, 'Vpc', { maxAzs: 1 });
  }
}

const app = new cdk.App();
new CdkStackVpc(app, 'prd-vpc');
app.synth();
