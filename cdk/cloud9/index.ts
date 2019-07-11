#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import cloud9 = require('@aws-cdk/aws-cloud9');

export class CdkStackCloud9 extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new cloud9.CfnEnvironmentEC2(this, 'cloud9', {
      name: this.node.tryGetContext("name"),
      instanceType: this.node.tryGetContext("instance_type"),
      automaticStopTimeMinutes: 60
    })
  }
}

const app = new cdk.App();
const inst = new CdkStackCloud9(app, 'prd-cloud9');
inst.node.applyAspect(new cdk.Tag('env', 'prd'));
inst.node.applyAspect(new cdk.Tag('Name', 'prd-cloud9'));
app.synth();
