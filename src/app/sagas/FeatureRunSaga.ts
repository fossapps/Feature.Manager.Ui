import autobind from "autobind-decorator";
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { isProblemDetails } from "../../Sdk";
import { fetchFeatureRunsForFeature } from "../redux/modules/featureRuns/fetchFeatureRunsForFeature";
import { BaseSaga, YieldReturn } from "./BaseSaga";

export class FeatureRunSaga extends BaseSaga {
  @autobind
  public *fetchRuns(action: ActionType<typeof fetchFeatureRunsForFeature.invoke>):
  IterableIterator<CallEffect | PutEffect<ActionType<typeof fetchFeatureRunsForFeature>>> {
    try {
      const client = this.client;
      yield put(fetchFeatureRunsForFeature.setPending(null));
      const runId = action.payload;
      type FeatureRunResponse = YieldReturn<typeof client.featureRuns.getFeatureRuns>;
      const response: FeatureRunResponse = yield call(client.featureRuns.getFeatureRuns, runId);
      if (isProblemDetails(response)) {
        yield put(fetchFeatureRunsForFeature.setRejected(null, response.title));
        return;
      }
      yield put(fetchFeatureRunsForFeature.setFulfilled(response));
    } catch (e) {
      yield put(fetchFeatureRunsForFeature.setRejected(null, e.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    return yield takeLatest(getType(fetchFeatureRunsForFeature.invoke), this.fetchRuns);
  }
}
