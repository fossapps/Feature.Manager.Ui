import { IFeatureState } from "../redux/modules/features/featureModule";
import { mapStateToProps } from "./HomePage";
describe("<HomePage />", () => {
  it("maps state to props correctly", () => {
    const features: IFeatureState = {
      error: null,
      features: [],
      loaded: true,
      pending: false
    };
    const props = mapStateToProps({ features });
    expect(props).toEqual({
      error: null,
      features: [],
      loaded: true,
      pending: false
    });
  });
});
