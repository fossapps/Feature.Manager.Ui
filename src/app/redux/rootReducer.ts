import { CombinedState, combineReducers, Reducer } from "redux";
import { router5Reducer } from "redux-router5";
import { IStore } from "./IStore";
import { counterReducer } from "./modules/counterModule";
import { featureRunsReducer } from "./modules/featureRuns/featureRunsModule";
import { featureReducer } from "./modules/features/featureModule";
import { settingsReducer } from "./modules/settingsModule";
import { starsReducer } from "./modules/starsModule";

const rootReducer: Reducer<CombinedState<IStore>> = combineReducers<IStore>({
  counter: counterReducer,
  featureRuns: featureRunsReducer,
  features: featureReducer,
  router: router5Reducer,
  settings: settingsReducer,
  stars: starsReducer
});

export default rootReducer;
