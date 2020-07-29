import { ICreateFeatureRunRequest, IFeatureRun } from "../../../../Sdk/nodes/FeatureRuns";
import { createAsyncActions } from "../baseModule";

export const fetchFeatureRunsForFeature = createAsyncActions(
  "FEATURE_RUNS/LOAD_RUNS",
  "FEATURE_RUNS/LOAD_RUNS_PENDING",
  "FEATURE_RUNS/LOAD_RUNS_FULFILLED",
  "FEATURE_RUNS/LOAD_RUNS_REJECTED"
)<string, null, IFeatureRun[], null>();

export const createFeatureRunForFeature = createAsyncActions(
  "FEATURE_RUNS/CREATE_RUN",
  "FEATURE_RUNS/CREATE_RUN_PENDING",
  "FEATURE_RUNS/CREATE_RUN_FULFILLED",
  "FEATURE_RUNS/CREATE_RUN_REJECTED"
)<ICreateFeatureRunRequest, null, IFeatureRun, null>();
