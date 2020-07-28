import { fork, ForkEffect } from "redux-saga/effects";
import { Sdk } from "../../Sdk";

type R<T> = T extends Promise<infer U> ? U : T;
export type YieldReturn<T> = R<ReturnType<T extends (...args: any) => any ? T : any>>;

export abstract class BaseSaga {
  constructor(protected client: Sdk) {
    this.registerListeners = this.registerListeners.bind(this);
  }

  public watch(): ForkEffect {
    return fork(this.registerListeners);
  }

  protected abstract registerListeners(): IterableIterator<ForkEffect>;
}
