import { IFetchRequest, IFetchResponse, IMiddleware } from "@crazyfactory/tinka";

export class ContentTypeMiddleware implements IMiddleware<IFetchRequest, Promise<IFetchResponse<any>>> {
  constructor(private contentType: string = "application/json") {
  }
  public process(
    options: IFetchRequest,
    next: (nextOptions: IFetchRequest) => Promise<IFetchResponse<any>>
  ): Promise<IFetchResponse<any>> {

    const newOptions: IFetchRequest = {
      ...options,
      headers: { ...options.headers, "Content-Type": this.contentType }
    };
    return next(newOptions);
  }
}
