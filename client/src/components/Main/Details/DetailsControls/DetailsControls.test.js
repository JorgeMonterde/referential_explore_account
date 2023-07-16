import React from "react";
import { shallow } from "enzyme";
import DetailsControls from "./DetailsControls";

describe("DetailsControls", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DetailsControls />);
    expect(wrapper).toMatchSnapshot();
  });
});
