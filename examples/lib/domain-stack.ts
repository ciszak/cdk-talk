import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { HostedZone } from "@aws-cdk/aws-route53";

export class DomainStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new HostedZone(this, "meetupdemo.ciszak.net", {
      zoneName: "meetupdemo.ciszak.net",
    });
  }
}
