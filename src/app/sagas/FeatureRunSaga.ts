import autobind from "autobind-decorator";
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { isProblemDetails } from "../../Sdk";
import {
  createFeatureRunForFeature,
  fetchFeatureRunsForFeature, stopFeatureRun
} from "../redux/modules/featureRuns/fetchFeatureRunsForFeature";
import { BaseSaga, YieldReturn } from "./BaseSaga";

type TCreateFeatureRunPutEffect = ActionType<
  typeof createFeatureRunForFeature | typeof fetchFeatureRunsForFeature.invoke
>;

export class FeatureRunSaga extends BaseSaga {

  @autobind
  public* createFeatureRun(action: ActionType<typeof createFeatureRunForFeature.invoke>):
  IterableIterator<CallEffect | PutEffect<TCreateFeatureRunPutEffect>> {
    try {
      const client = this.client;
      yield put(createFeatureRunForFeature.setPending(null));
      type TResponse = YieldReturn<typeof client.featureRuns.createFeatureRun>;
      const response: TResponse = yield call(client.featureRuns.createFeatureRun, action.payload);
      if (isProblemDetails(response)) {
        yield put(createFeatureRunForFeature.setRejected(null, response.title));
        return;
      }
      yield put(createFeatureRunForFeature.setFulfilled(response));
      yield put(fetchFeatureRunsForFeature.invoke(action.payload.featId));
    } catch (e) {
      yield put(createFeatureRunForFeature.setRejected(null, e.toString()));
    }
  }

  @autobind
  public* fetchRuns(action: ActionType<typeof fetchFeatureRunsForFeature.invoke>):
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

  @autobind
  public* stopRun(action: ActionType<typeof stopFeatureRun.invoke>):
  IterableIterator<
  CallEffect | PutEffect<ActionType<typeof stopFeatureRun | typeof fetchFeatureRunsForFeature.invoke>>
  > {
    try {
      const client = this.client;
      yield put(stopFeatureRun.setPending(null));
      const { featureId, ...payload } = action.payload;
      const result: YieldReturn<typeof client.featureRuns.stopRun> = yield call(client.featureRuns.stopRun, payload);
      if (isProblemDetails(result)) {
        yield put(stopFeatureRun.setRejected(null, result.title));
        return;
      }
      yield put(stopFeatureRun.setFulfilled(null));
      yield put(fetchFeatureRunsForFeature.invoke(featureId));
    } catch (e) {
      yield put(stopFeatureRun.setRejected(null, e.toString()));
    }
  }

  protected* registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(fetchFeatureRunsForFeature.invoke), this.fetchRuns);
    yield takeLatest(getType(createFeatureRunForFeature.invoke), this.createFeatureRun);
    yield takeLatest(getType(stopFeatureRun.invoke), this.stopRun);
  }
}
