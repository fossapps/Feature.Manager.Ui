import { all, AllEffect } from "redux-saga/effects";
import { Sdk } from "../../Sdk";
import { FeatureRunSaga } from "./FeatureRunSaga";
import { FeatureSaga } from "./FeatureSaga";

export default function* rootSaga(): IterableIterator<AllEffect<any>> {
  // eslint-disable-next-line @typescript-eslint/tslint/config
  const api = Sdk.getInstance("http://localhost:5000");
  yield all([
    (new FeatureSaga(api)).watch(),
    (new FeatureRunSaga(api)).watch()
  ]);
}
