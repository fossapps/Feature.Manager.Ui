import { ICreateFeatureRequest, IFeature } from "../../../../Sdk/nodes/Features";
import { createAsyncActions } from "../baseModule";

export const featureActionCreators = createAsyncActions(
  "FEATURES/LOAD_FEATURES",
  "FEATURES/LOAD_FEATURES_PENDING",
  "FEATURES/LOAD_FEATURES_FULFILLED",
  "FEATURES/LOAD_FEATURES_REJECTED"
)<null, null, IFeature[], null>();

export const createFeatureActionCreators = createAsyncActions(
  "FEATURES/CREATE_FEATURE",
  "FEATURES/CREATE_FEATURE_PENDING",
  "FEATURES/CREATE_FEATURE_FULFILLED",
  "FEATURES/CREATE_FEATURE_REJECTED"
)<ICreateFeatureRequest, null, IFeature, null>();
