import autobind from "autobind-decorator";
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { isProblemDetails } from "../../Sdk";
import { createFeatureActionCreators, featureActionCreators } from "../redux/modules/features/featureActionCreators";
import { BaseSaga, YieldReturn } from "./BaseSaga";

type TCreateNewFeatureActionType = ActionType<typeof createFeatureActionCreators.invoke>;

type TCreateNewFeatureEffectType =
  CallEffect
  | PutEffect<ActionType<typeof createFeatureActionCreators | typeof featureActionCreators.invoke>>;

export class FeatureSaga extends BaseSaga {
  @autobind
  public* createNewFeature(action: TCreateNewFeatureActionType): IterableIterator<TCreateNewFeatureEffectType> {
    try {
      const client = this.client;
      yield put(createFeatureActionCreators.setPending(null));
      type TReturnType = YieldReturn<typeof client.features.createFeature>;
      const response: TReturnType = yield call(client.features.createFeature, action.payload);
      if (isProblemDetails(response)) {
        yield put(createFeatureActionCreators.setRejected(null, response.title));
        return;
      }
      yield put(createFeatureActionCreators.setFulfilled(response));
      yield put(featureActionCreators.invoke(null));
    } catch (e) {
      console.error(e);
      yield put(createFeatureActionCreators.setRejected(null, e.toString()));
    }
  }

  @autobind
  public* fetchFeatures(): IterableIterator<CallEffect | PutEffect<ActionType<typeof featureActionCreators>>> {
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

  protected* registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(featureActionCreators.invoke), this.fetchFeatures);
    yield takeLatest(getType(createFeatureActionCreators.invoke), this.createNewFeature);
  }
}
