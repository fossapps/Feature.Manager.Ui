import { IFetchRequest, Service } from "@crazyfactory/tinka";
import autobind from "autobind-decorator";
import { IProblemDetails } from "../Sdk";

export interface ICreateFeatureRunRequest {
  allocation: number;
  endAt?: string;
  featId: string;
  startAt: string;
}

export interface IFeatureRun {
  allocation: number;
  endAt?: string;
  featId: string;
  id: string;
  runToken: string;
  startAt: string;
  stopResult?: "AllB" | "Removed" | "AllA" | "ChangeSettings";
}

export interface IStopFeatureRunRequest {
  runId: string;
  stopResult: string;
}

export class FeatureRuns extends Service {

  @autobind
  public createFeatureRun(run: ICreateFeatureRunRequest): Promise<IFeatureRun | IProblemDetails> {
    const request = {
      body: JSON.stringify(run),
      method: "PUT",
      url: `/api/featureRuns`
    } as IFetchRequest;
    return this.client.process(request);
  }

  @autobind
  public getFeatureRunById(runId: string): Promise<IFeatureRun | IProblemDetails> {
    const request = {
      method: "GET",
      url: `/api/featureRuns/${runId}`
    } as IFetchRequest;
    return this.client.process(request);
  }

  @autobind
  public getFeatureRuns(featId: string): Promise<IFeatureRun[] | IProblemDetails> {
    const request = {
      method: "GET",
      url: `/api/featureRuns/${featId}/runs`
    } as IFetchRequest;
    return this.client.process(request);
  }

  @autobind
  public stopRun(details: IStopFeatureRunRequest): Promise<IFeatureRun | IProblemDetails> {
    const request = {
      body: JSON.stringify(details),
      method: "POST",
      url: `/api/featureRuns/stop`
    } as IFetchRequest;
    return this.client.process(request);
  }
}
