import React from "react";
import { shallow } from "enzyme";
import NewProject from "./NewProject";

describe("NewProject", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NewProject />);
    expect(wrapper).toMatchSnapshot();
  });
});
