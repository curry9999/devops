#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');

export class CdkStackIam extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new iam.CfnGroup(this, 'IamGroup', {
      groupName: "gruop-curry9999"
    });

  }
}

const app = new cdk.App();
new CdkStackIam(app, 'prd-iam');
app.synth();
