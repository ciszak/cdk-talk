import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { ApplicationLoadBalancedFargateService } from "@aws-cdk/aws-ecs-patterns";
import { ContainerImage } from "@aws-cdk/aws-ecs";
import { Vpc } from "@aws-cdk/aws-ec2";
import { HostedZone } from "@aws-cdk/aws-route53";
import { DnsValidatedCertificate } from "@aws-cdk/aws-certificatemanager";

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

    const certificate = new DnsValidatedCertificate(this, "Cert", {
      domainName,
      hostedZone,
    });

    new ApplicationLoadBalancedFargateService(this, "Service", {
      vpc,
      domainName,
      domainZone: hostedZone,
      certificate,
      taskImageOptions: {
        image: ContainerImage.fromAsset("./apps/randomizer"),
        containerPort: 8080,
      },
    });
  }
}
