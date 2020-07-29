import { CombinedState, combineReducers, Reducer } from "redux";
import { router5Reducer } from "redux-router5";
import { IStore } from "./IStore";
import { featureRunsReducer } from "./modules/featureRuns/featureRunsModule";
import { featureReducer } from "./modules/features/featureModule";

const rootReducer: Reducer<CombinedState<IStore>> = combineReducers<IStore>({
  featureRuns: featureRunsReducer,
  features: featureReducer,
  router: router5Reducer
});

export default rootReducer;
