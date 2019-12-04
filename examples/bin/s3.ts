#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { S3Stack } from "../lib/s3-stack";

const app = new cdk.App();
new S3Stack(app, "MyFirstStack");
