import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { ApplicationLoadBalancedFargateService } from "@aws-cdk/aws-ecs-patterns";
import { ContainerImage } from "@aws-cdk/aws-ecs";
import { Vpc } from "@aws-cdk/aws-ec2";
import { HostedZone } from "@aws-cdk/aws-route53";

interface FargateProps extends StackProps {
  domainName: string;
}

export class FargateStack extends Stack {
  constructor(scope: Construct, id: string, props: FargateProps) {
    super(scope, id, props);

    const { domainName } = props;

    const vpc = new Vpc(this, "Vpc", {
      maxAzs: 2,
    });

    const hostedZone = HostedZone.fromLookup(this, "Domain", {
      domainName,
    });

    new ApplicationLoadBalancedFargateService(this, "Service", {
      vpc,
      domainName,
      domainZone: hostedZone,
      taskImageOptions: {
        image: ContainerImage.fromAsset("./apps/randomizer"),
        containerPort: 8080,
      },
    });
  }
}
