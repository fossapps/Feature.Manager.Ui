import { IFeature } from "../../../../Sdk/nodes/Features";
import { featureActionCreators } from "./featureActionCreators";
import { featureReducer } from "./featureModule";

describe("featureModule", () => {
  describe("initialState", () => {
    it("should return default initial state", () => {
      const data = featureReducer(undefined, { type: "INIT" } as any);
      expect(data.features.length).toBe(0);
      expect(data.pending).toBeFalsy();
      expect(data.loaded).toBeFalsy();
      expect(data.error).toBeNull();
    });
  });

  describe("pending state", () => {
    it("should set pending to true when fetching is started", () => {
      const mockState = { error: null, loaded: false, pending: false, features: [] };
      const data = featureReducer(mockState, featureActionCreators.setPending(null));
      expect(data.pending).toBeTruthy();
    });
  });

  describe("fetching done", () => {
    it("should be able to add items to list", () => {
      const mockState = { error: null, loaded: false, pending: false, features: [] };
      const mockFeature: IFeature = {
        description: "",
        featId: "APP-12",
        featureToken: "token",
        hypothesis: "",
        id: "123"
      };
      const data = featureReducer(mockState, featureActionCreators.setFulfilled([mockFeature]));
      expect(data.features[0]).toBe(mockFeature);
    });

    it("should set loaded to true when fetching is done", () => {
      const mockState = { error: null, loaded: false, pending: false, features: [] };
      const mockFeature: IFeature = {
        description: "",
        featId: "APP-12",
        featureToken: "token",
        hypothesis: "",
        id: "123"
      };
      const data = featureReducer(mockState, featureActionCreators.setFulfilled([mockFeature]));
      expect(data.loaded).toBeTruthy();
    });

    it("should set pending to false once fetching is done", () => {
      const mockState = { error: null, loaded: false, pending: false, features: [] };
      const mockFeature: IFeature = {
        description: "",
        featId: "APP-12",
        featureToken: "token",
        hypothesis: "",
        id: "123"
      };
      const data = featureReducer(mockState, featureActionCreators.setFulfilled([mockFeature]));
      expect(data.pending).toBeFalsy();
    });
  });

  describe("error state", () => {
    it("should set loaded state to true, error to error value, and pending to false", () => {
      const mockState = { error: null, loaded: false, pending: true, features: [] };
      const data = featureReducer(mockState, featureActionCreators.setRejected(null, "some error"));
      expect(data.error).toBe("some error");
      expect(data.pending).toBeFalsy();
      expect(data.loaded).toBeTruthy();
    });
  });
});
