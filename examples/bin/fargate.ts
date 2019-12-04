#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { FargateStack } from "../lib/fargate-stack";

const app = new cdk.App();
new FargateStack(app, "FargateStack", {
  env: {
    account: "348440605270",
    region: "eu-central-1",
  },
  domainName: "meetupdemo.ciszak.net",
});
