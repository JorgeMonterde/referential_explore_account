import React from "react";
import { shallow } from "enzyme";
import SelectProject from "./SelectProject";

describe("SelectProject", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SelectProject />);
    expect(wrapper).toMatchSnapshot();
  });
});
