import { fork, ForkEffect } from "redux-saga/effects";
import { Sdk } from "../../Sdk";

export abstract class BaseSaga {
  constructor(protected client: Sdk) {
    this.registerListeners = this.registerListeners.bind(this);
  }

  public watch(): ForkEffect {
    return fork(this.registerListeners);
  }

  protected abstract registerListeners(): IterableIterator<ForkEffect>;
}
