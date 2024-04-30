import { GenezioDeploy, GenezioAuth, GnzContext } from "@genezio/types";

@GenezioDeploy()
export class BackendService {
  readonly secret = "Capybaras are AWESOME! Shhh... don't tell the cats!";

  @GenezioAuth()
  async getSecret(context: GnzContext) {
      console.log(context.user);
      return this.secret;
  }
}
