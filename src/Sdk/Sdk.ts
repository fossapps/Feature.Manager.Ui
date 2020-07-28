import { Client, Service } from "@crazyfactory/tinka";
import { ContentTypeMiddleware } from "./middlewares/ContentTypeMiddleware";
import { WrapMiddleware } from "./middlewares/WrapMiddleware";
import { FeatureRuns } from "./nodes/FeatureRuns";
import { Features } from "./nodes/Features";

export interface IProblemDetails {
  status: number;
  title: string;
}

export const isProblemDetails = (item: any | IProblemDetails): item is IProblemDetails => {
  return "title" in item;
};

export class Sdk extends Service {
  public static instance: Sdk = null;
  public static getInstance(baseUrl: string): Sdk {
    if (Sdk.instance === null) {
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

  public get features(): Features {
    return new Features(this.client);
  }

  public get featureRuns(): FeatureRuns {
    return new FeatureRuns(this.client);
  }
}
