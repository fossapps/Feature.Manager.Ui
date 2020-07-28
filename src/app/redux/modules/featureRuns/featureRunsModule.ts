import { ActionType, getType } from "typesafe-actions";
import { IFeatureRun } from "../../../../Sdk/nodes/FeatureRuns";
import { IBaseState } from "../baseModule";
import { featureRunsActionCreator } from "./featureRunsActionCreator";

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
  action: ActionType<typeof featureRunsActionCreator>
): IFeatureRunsState {
  switch (action.type) {
    case getType(featureRunsActionCreator.setPending):
      return { ...state, pending: true };
    case getType(featureRunsActionCreator.setFulfilled):
      return { ...state, runs: action.payload, pending: false, loaded: true };
    case getType(featureRunsActionCreator.setRejected):
      return { ...state, pending: false, error: action.message, loaded: true };
    default:
      return state;
  }
}
