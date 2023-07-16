import React from "react";
import { shallow } from "enzyme";
import Popover from "./Popover";

describe("Popover", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Popover />);
    expect(wrapper).toMatchSnapshot();
  });
});
