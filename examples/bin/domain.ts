#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { DomainStack } from "../lib/domain-stack";

const app = new cdk.App();
new DomainStack(app, "DemoDomain");
