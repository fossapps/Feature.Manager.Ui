import { RouterState } from "redux-router5";
import { ICounterState } from "./modules/counterModule";
import { IFeatureRunsState } from "./modules/featureRuns/featureRunsModule";
import { IFeatureState } from "./modules/features/featureModule";
import { ISettingsState } from "./modules/settingsModule";
import { IStarsState } from "./modules/starsModule";

export interface IStore {
  counter: ICounterState;
  featureRuns: IFeatureRunsState;
  features: IFeatureState;
  router: RouterState;
  settings: ISettingsState;
  stars: IStarsState;
}
