import { RouterState } from "redux-router5";
import { IFeatureRunsState } from "./modules/featureRuns/featureRunsModule";
import { IFeatureState } from "./modules/features/featureModule";

export interface IStore {
  featureRuns: IFeatureRunsState;
  features: IFeatureState;
  router: RouterState;
}
