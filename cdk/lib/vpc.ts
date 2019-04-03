import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');

export class CdkStackVpc extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC
    const vpc = new ec2.VpcNetwork(this, 'VPC', {
      cidr: '10.0.0.0/21',
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Ingress',
          subnetType: ec2.SubnetType.Public,
        },
      ],
    });

    // Create SecurityGroup
    const mySecurityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      description: 'Allow ssh access to ec2 instances',
      allowAllOutbound: true   // Can be set to false
    });

    // Create Security Group
    mySecurityGroup.addIngressRule(new ec2.AnyIPv4(), new ec2.TcpPort(22), 'allow ssh access from the world');

    // Get Subnet
    let subnetid;
    for (let subnet of vpc.publicSubnets) {
      subnetid = subnet.subnetId;
    }

    // Create EC2 Instance
    new ec2.CfnInstance(this, 'Instance' , {
      imageId: 'ami-07ad4b1c3af1ea214',
      instanceType: 't2.micro',
      keyName: this.node.getContext("key_pair"),
      networkInterfaces: [
        {
          deviceIndex: '0',
          associatePublicIpAddress: true,
          subnetId: subnetid,
          groupSet: [
            mySecurityGroup.securityGroupId
          ]
        }
      ]
    });
  }
}