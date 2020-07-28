import { ActionType, getType } from "typesafe-actions";
import { IFeature } from "../../../../Sdk/nodes/Features";
import { IBaseState } from "../baseModule";
import { featureActionCreators } from "./featureActionCreators";

export interface IFeatureState extends IBaseState {
  features: IFeature[];
}

const initialState: IFeatureState = {
  error: null,
  features: [],
  loaded: false,
  pending: false
};

export function featureReducer(
  state: IFeatureState = initialState,
  action: ActionType<typeof featureActionCreators>
): IFeatureState {
  switch (action.type) {
    case getType(featureActionCreators.setFulfilled):
      return { ...state, features: action.payload, loaded: true, pending: false };
    case getType(featureActionCreators.setPending):
      return { ...state, pending: true };
    case getType(featureActionCreators.setRejected):
      return { ...state, pending: false, loaded: true, error: action.message };
    default:
      return state;
  }
}
