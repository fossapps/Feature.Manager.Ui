import { all, AllEffect } from "redux-saga/effects";
import { Sdk } from "../../Sdk";
import { FeatureRunSaga } from "./FeatureRunSaga";
import { FeatureSaga } from "./FeatureSaga";

const getApiUrl = () => {
  if (localStorage.getItem("X-Override-Api-Url")) {
    return localStorage.getItem("X-Override-Api-Url");
  }
  // eslint-disable-next-line @typescript-eslint/tslint/config
  return "http://localhost:5000";
};
export default function* rootSaga(): IterableIterator<AllEffect<any>> {
  // eslint-disable-next-line @typescript-eslint/tslint/config
  const api = Sdk.getInstance(getApiUrl());
  yield all([
    (new FeatureSaga(api)).watch(),
    (new FeatureRunSaga(api)).watch()
  ]);
}
