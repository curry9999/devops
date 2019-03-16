#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { CdkStackEc2 } from '../lib/ec2';

const app = new cdk.App();

// Stack EC2
const ec2 = new CdkStackEc2(app, 'prd-ec2-linux');
ec2.node.apply(new cdk.Tag('env', 'prd'));
ec2.node.apply(new cdk.Tag('os', 'linux'));
ec2.node.apply(new cdk.Tag('version', '2019'));
ec2.node.apply(new cdk.Tag('Name', 'prd-linux-ubuntu-1804'));

app.run();
