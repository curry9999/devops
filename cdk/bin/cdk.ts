#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { CdkStackEc2 } from '../lib/ec2';
import { Tag } from '@aws-cdk/cdk';

const app = new cdk.App();
const ec2 = new CdkStackEc2(app, 'prd-ec2-linux');
ec2.node.apply(new Tag('env','prd'));
ec2.node.apply(new Tag('os','linux'));
ec2.node.apply(new Tag('version','2019'));
ec2.node.apply(new Tag('Name','prd-linux-ubuntu-1804'));

app.run();
