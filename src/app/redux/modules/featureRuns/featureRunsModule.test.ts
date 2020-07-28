import { IFeatureRun } from "../../../../Sdk/nodes/FeatureRuns";
import { featureRunsReducer } from "./featureRunsModule";
import { fetchFeatureRunsForFeature } from "./fetchFeatureRunsForFeature";

describe("featureRunsModule", () => {
  describe("initialState", () => {
    it("should return a default initialState", () => {
      const data = featureRunsReducer(undefined, { type: "INIT" } as any);
      expect(data.runs.length).toBe(0);
      expect(data.error).toBeNull();
      expect(data.pending).toBeFalsy();
      expect(data.loaded).toBeFalsy();
    });
  });
  describe("pending state", () => {
    it("should set pending to true when fetching is started", () => {
      const mockState = { error: null, loaded: false, pending: false, runs: [] };
      const data = featureRunsReducer(mockState, fetchFeatureRunsForFeature.setPending(null));
      expect(data.pending).toBeTruthy();
    });
  });

  describe("fetching done", () => {
    it("should be able to add items to list", () => {
      const mockState = { error: null, loaded: false, pending: false, runs: [] };
      const mockRun: IFeatureRun = {
        allocation: 100,
        endAt: "",
        featId: "APP-12",
        id: "",
        runToken: "",
        startAt: ""
      };
      const data = featureRunsReducer(mockState, fetchFeatureRunsForFeature.setFulfilled([mockRun]));
      expect(data.runs[0]).toBe(mockRun);
    });

    it("should set loaded to true when fetching is done", () => {
      const mockState = { error: null, loaded: false, pending: false, runs: [] };
      const mockRun: IFeatureRun = {
        allocation: 100,
        endAt: "",
        featId: "APP-12",
        id: "",
        runToken: "",
        startAt: ""
      };
      const data = featureRunsReducer(mockState, fetchFeatureRunsForFeature.setFulfilled([mockRun]));
      expect(data.loaded).toBeTruthy();
    });

    it("should set pending to false once fetching is done", () => {
      const mockState = { error: null, loaded: false, pending: false, runs: [] };
      const mockRun: IFeatureRun = {
        allocation: 100,
        endAt: "",
        featId: "APP-12",
        id: "",
        runToken: "",
        startAt: ""
      };
      const data = featureRunsReducer(mockState, fetchFeatureRunsForFeature.setFulfilled([mockRun]));
      expect(data.pending).toBeFalsy();
    });
  });

  describe("error state", () => {
    it("should set loaded state to true, error to error value, and pending to false", () => {
      const mockState = { error: null, loaded: false, pending: true, runs: [] };
      const data = featureRunsReducer(mockState, fetchFeatureRunsForFeature.setRejected(null, "some error"));
      expect(data.error).toBe("some error");
      expect(data.pending).toBeFalsy();
      expect(data.loaded).toBeTruthy();
    });
  });
});
