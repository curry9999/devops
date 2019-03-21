#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { CdkStackEc2 } from '../lib/ec2';
import { CdkStackVpc } from '../lib/vpc';

const app = new cdk.App();

// Stack EC2
const prd = new CdkStackEc2(app, 'prd-ec2-linux');
prd.node.apply(new cdk.Tag('env', 'prd'));
prd.node.apply(new cdk.Tag('Name', 'prd-linux-ubuntu-1804'));

// Stack VPC
const vpc = new CdkStackVpc(app, 'prd-vpc');
vpc.node.apply(new cdk.Tag('env', 'prd'));
vpc.node.apply(new cdk.Tag('Name', 'prd-vpc'));

// Run
app.run();
