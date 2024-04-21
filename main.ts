import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace } from "cdktf";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
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
