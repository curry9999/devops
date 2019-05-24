#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import dynamodb = require('@aws-cdk/aws-dynamodb');

export class CdkStackIam extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new dynamodb.CfnTable(this, 'TableMultiIndex', {
      attributeDefinitions: [
        {
          attributeName: "col1",
          attributeType: "S"
        },{
          attributeName: "col2",
          attributeType: "S"
        },{
          attributeName: "col3",
          attributeType: "N"
        },{
          attributeName: "col4",
          attributeType: "S"
        }
      ],
      keySchema: [
        {
          attributeName: "col1",
          keyType: "HASH"
        },{
          attributeName: "col2",
          keyType: "RANGE"
        }
      ],
      globalSecondaryIndexes: [
        {
          indexName: "gindex1",
          keySchema: [
              {
                attributeName: "col3",
                keyType: "HASH"
              },{
                attributeName: "col4",
                keyType: "RANGE"
              }
          ],
          projection: {
            nonKeyAttributes: [
                "col1",
                "col2"
            ],
            projectionType: "INCLUDE"
          },
          provisionedThroughput: {
            readCapacityUnits: 1,
            writeCapacityUnits: 1
          }
        }
      ],
      provisionedThroughput: {
        readCapacityUnits: 1,
        writeCapacityUnits: 1
      },
      tableName: "table1"
    });
  }
}

const app = new cdk.App();
new CdkStackIam(app, 'prd-dynamodb');
app.run();
