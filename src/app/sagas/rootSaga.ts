import { all, AllEffect } from "redux-saga/effects";
import { Sdk } from "../../Sdk";
import { FeatureRunSaga } from "./FeatureRunSaga";
import { FeatureSaga } from "./FeatureSaga";
import { SettingsSaga } from "./SettingsSaga";
import { StarsSaga } from "./StarsSaga";

export default function* rootSaga(): IterableIterator<AllEffect<any>> {
  const api = Sdk.getInstance("");
  yield all([
    (new SettingsSaga(api)).watch(),
    (new StarsSaga(api)).watch(),
    (new FeatureSaga(api)).watch(),
    (new FeatureRunSaga(api)).watch()
  ]);
}
