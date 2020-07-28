import { all, AllEffect } from "redux-saga/effects";
import { Sdk } from "../../Sdk";
import { FeatureRunSaga } from "./FeatureRunSaga";
import { FeatureSaga } from "./FeatureSaga";
import { SettingsSaga } from "./SettingsSaga";
import { StarsSaga } from "./StarsSaga";

export default function* rootSaga(): IterableIterator<AllEffect<any>> {
  // eslint-disable-next-line @typescript-eslint/tslint/config
  const api = Sdk.getInstance("http://localhost:5000");
  yield all([
    (new SettingsSaga(api)).watch(),
    (new StarsSaga(api)).watch(),
    (new FeatureSaga(api)).watch(),
    (new FeatureRunSaga(api)).watch()
  ]);
}
