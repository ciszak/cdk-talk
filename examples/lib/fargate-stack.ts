import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { ApplicationLoadBalancedFargateService } from "@aws-cdk/aws-ecs-patterns";
import { ContainerImage } from "@aws-cdk/aws-ecs";
import { Vpc } from "@aws-cdk/aws-ec2";

export class FargateStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "Vpc", {
      maxAzs: 2,
    });

    new ApplicationLoadBalancedFargateService(this, "Service", {
      vpc,
      taskImageOptions: {
        image: ContainerImage.fromAsset("./apps/randomizer"),
        containerPort: 8080,
      },
    });
  }
}
