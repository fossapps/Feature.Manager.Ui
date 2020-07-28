import { IFeatureRun } from "../../../../Sdk/nodes/FeatureRuns";
import { createAsyncActions } from "../baseModule";

export const featureRunsActionCreator = createAsyncActions(
  "FEATURE_RUNS/LOAD_RUNS",
  "FEATURE_RUNS/LOAD_RUNS_PENDING",
  "FEATURE_RUNS/LOAD_RUNS_FULFILLED",
  "FEATURE_RUNS/LOAD_RUNS_REJECTED"
)<string, null, IFeatureRun[], null>();
