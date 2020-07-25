import { Client, Service } from "@crazyfactory/tinka";
import { ContentTypeMiddleware } from "./middlewares/ContentTypeMiddleware";
import { WrapMiddleware } from "./middlewares/WrapMiddleware";

export class Sdk extends Service {
  public static instance: Sdk = null;
  public static getInstance(baseUrl: string): Sdk {
    if (!Sdk.instance === null) {
      Sdk.instance = Sdk.createSdk(baseUrl);
    }
    return Sdk.instance;
  }

  public static createSdk(baseUrl: string): Sdk {
    const client = new Client({ baseUrl });
    client.addMiddleware(new WrapMiddleware());
    client.addMiddleware(new ContentTypeMiddleware());
    return new Sdk(client);
  }
}
