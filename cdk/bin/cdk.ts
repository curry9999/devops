#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { CdkStackEc2 } from '../lib/ec2';
import { CdkStackVpc } from '../lib/vpc';

const app = new cdk.App();

// Stack EC2 stg
const stg = new CdkStackEc2(app, 'stg-ec2-linux');
stg.node.apply(new cdk.Tag('env', 'stg'));
stg.node.apply(new cdk.Tag('Name', 'stg-linux-ubuntu-1804'));

// Stack EC2 prd
const prd = new CdkStackEc2(app, 'prd-ec2-linux');
prd.node.apply(new cdk.Tag('env', 'prd'));
prd.node.apply(new cdk.Tag('Name', 'prd-linux-ubuntu-1804'));

// Stack VPC prd
const vpc = new CdkStackVpc(app, 'prd-vpc');
vpc.node.apply(new cdk.Tag('env', 'prd'));
vpc.node.apply(new cdk.Tag('Name', 'prd-vpc'));

// Run
app.run();
