import autobind from "autobind-decorator";
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { IProblemDetails, isProblemDetails } from "../../Sdk";
import { IFeature } from "../../Sdk/nodes/Features";
import { featureActionCreators } from "../redux/modules/features/featureActionCreators";
import { BaseSaga } from "./BaseSaga";

export class FeatureSaga extends BaseSaga {
  @autobind
  public *fetchFeatures(): IterableIterator<CallEffect | PutEffect<ActionType<typeof featureActionCreators>>> {
    try {
      yield put(featureActionCreators.setPending(null));
      const response: IFeature[] | IProblemDetails = yield call(this.client.features.getFeatures);
      if (isProblemDetails(response)) {
        yield put(featureActionCreators.setRejected(null, response.title));
        return;
      }
      yield put(featureActionCreators.setFulfilled(response));
    } catch (e) {
      yield put(featureActionCreators.setRejected(null, e.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(featureActionCreators.invoke), this.fetchFeatures);
  }
}
