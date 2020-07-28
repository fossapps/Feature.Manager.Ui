import autobind from "autobind-decorator";
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { IProblemDetails, isProblemDetails } from "../../Sdk";
import { IFeatureRun } from "../../Sdk/nodes/FeatureRuns";
import { featureRunsActionCreator } from "../redux/modules/featureRuns/featureRunsActionCreator";
import { BaseSaga } from "./BaseSaga";

export class FeatureRunSaga extends BaseSaga {
  @autobind
  public *fetchRuns(action: ActionType<typeof featureRunsActionCreator.invoke>):
  IterableIterator<CallEffect | PutEffect<ActionType<typeof featureRunsActionCreator>>> {
    try {
      yield put(featureRunsActionCreator.setPending(null));
      const runId = action.payload;
      const response: IFeatureRun[] | IProblemDetails = yield call(this.client.featureRuns.getFeatureRunById, runId);
      if (isProblemDetails(response)) {
        yield put(featureRunsActionCreator.setRejected(null, response.title));
        return;
      }
      yield put(featureRunsActionCreator.setFulfilled(response));
    } catch (e) {
      yield put(featureRunsActionCreator.setRejected(null, e.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    return yield takeLatest(getType(featureRunsActionCreator.invoke), this.fetchRuns);
  }
}
