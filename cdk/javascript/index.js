const cdk = require('@aws-cdk/core');
const iam = require('@aws-cdk/aws-iam');

class JavascriptStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(app, id, props) {
    super(app, id, props);

    new iam.CfnGroup(this, 'IamGroup', {
      groupName: "gruop-curry9999-01"
    });
  }
}
const app = new cdk.App();
new JavascriptStack(app, 'JavascriptStack');
