import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import cdk = require("@aws-cdk/core");
import Examples = require("../lib/s3-stack");

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Examples.S3Stack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
