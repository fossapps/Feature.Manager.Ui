import { IFeature } from "../../../../Sdk/nodes/Features";
import { createAsyncActions } from "../baseModule";

export const featureActionCreators = createAsyncActions(
  "FEATURES/LOAD_FEATURES",
  "FEATURES/LOAD_FEATURES_PENDING",
  "FEATURES/LOAD_FEATURES_FULFILLED",
  "FEATURES/LOAD_FEATURES_REJECTED"
)<null, null, IFeature[], null>();
