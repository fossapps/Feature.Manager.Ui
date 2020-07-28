import { ActionType, getType } from "typesafe-actions";
import { IFeatureRun } from "../../../../Sdk/nodes/FeatureRuns";
import { IBaseState } from "../baseModule";
import { fetchFeatureRunsForFeature } from "./fetchFeatureRunsForFeature";

export interface IFeatureRunsState extends IBaseState {
  runs: IFeatureRun[];
}
const initialState: IFeatureRunsState = {
  error: null,
  loaded: false,
  pending: false,
  runs: []
};
export function featureRunsReducer(
  state: IFeatureRunsState = initialState,
  action: ActionType<typeof fetchFeatureRunsForFeature>
): IFeatureRunsState {
  switch (action.type) {
    case getType(fetchFeatureRunsForFeature.setPending):
      return { ...state, pending: true };
    case getType(fetchFeatureRunsForFeature.setFulfilled):
      return { ...state, runs: action.payload, pending: false, loaded: true };
    case getType(fetchFeatureRunsForFeature.setRejected):
      return { ...state, pending: false, error: action.message, loaded: true };
    default:
      return state;
  }
}
