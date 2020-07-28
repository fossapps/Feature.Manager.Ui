import { IFetchRequest, Service } from "@crazyfactory/tinka";
import autobind from "autobind-decorator";
import { IProblemDetails } from "../Sdk";

export interface ICreateFeatureRequest {
  description: string;
  featId: string;
  hypothesis: string;
}

export interface IFeature {
  description: string;
  featId: string;
  featureToken: string;
  hypothesis: string;
  id: string;
}

export class Features extends Service {
  @autobind
  public createFeature(feature: ICreateFeatureRequest): Promise<IFeature | IProblemDetails> {
    const request = {
      body: JSON.stringify(feature),
      method: "PUT",
      url: "/api/feature"
    } as IFetchRequest;
    return this.client.process(request);
  }

  @autobind
  public getFeature(featId: string): Promise<IFeature | IProblemDetails> {
    const request = {
      method: "GET",
      url: `/api/feature/${featId}`
    } as IFetchRequest;
    return this.client.process(request);
  }

  @autobind
  public getFeatures(): Promise<IFeature[] | IProblemDetails> {
    const request = {
      method: "GET",
      url: "/api/feature"
    } as IFetchRequest;
    return this.client.process(request);
  }

  @autobind
  public resetFeatureToken(featId: string): Promise<IFeature | IProblemDetails> {
    const request = {
      method: "POST",
      url: `/api/feature/${featId}/resetFeatToken`
    } as IFetchRequest;
    return this.client.process(request);
  }
}
