import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace } from "cdktf";
import * as auth0 from "./.gen/providers/auth0";
class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new auth0.role.Role(this, "testgroupb", {
      name: "testgroupb"
    });

  }
}

const app = new App();
const stack = new MyStack(app, "auth0-test");
new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "dev-05844969-okta-com-DEV",
  workspaces: new NamedCloudWorkspace("auth0-test")
});
app.synth();
