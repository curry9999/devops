#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CdkStackEc2 } from '../lib/linux-stack';

const app = new cdk.App();
new CdkStackEc2(app, 'prd-ec2-linux');
app.synth();
