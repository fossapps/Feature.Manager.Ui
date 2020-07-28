import autobind from "autobind-decorator";
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { isProblemDetails } from "../../Sdk";
import { featureActionCreators } from "../redux/modules/features/featureActionCreators";
import { BaseSaga, YieldReturn } from "./BaseSaga";

export class FeatureSaga extends BaseSaga {
  @autobind
  public *fetchFeatures(): IterableIterator<CallEffect | PutEffect<ActionType<typeof featureActionCreators>>> {
    try {
      const client = this.client;
      yield put(featureActionCreators.setPending(null));
      const response: YieldReturn<typeof client.features.getFeatures> = yield call(client.features.getFeatures);
      if (isProblemDetails(response)) {
        yield put(featureActionCreators.setRejected(null, response.title));
        return;
      }
      yield put(featureActionCreators.setFulfilled(response));
    } catch (e) {
      console.error(e);
      yield put(featureActionCreators.setRejected(null, e.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(featureActionCreators.invoke), this.fetchFeatures);
  }
}
