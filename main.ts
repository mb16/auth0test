import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace } from "cdktf";
import * as auth0 from "./.gen/providers/auth0";
import * as cdktf from "cdktf";
//import { config } from "process";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const clientId = new cdktf.TerraformVariable(this, "clientId", {});
    const clientSecret = new cdktf.TerraformVariable(this, "clientSecret", {});
    const domain = new cdktf.TerraformVariable(this, "domain", {});

    new auth0.role.Role(this, "testgroupb", {
      name: "testgroupb"
    });

    new auth0.role.Role(this, "testgroupc", {
      name: "testgroupc"
    });

    new auth0.role.Role(this, "testgroupd", {
      name: "testgroupd"
    });

    new auth0.provider.Auth0Provider(scope = this, "testAuth0Provider",  {
      clientId: clientId.value,
      clientSecret: clientSecret.value,
      domain: domain.value
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
