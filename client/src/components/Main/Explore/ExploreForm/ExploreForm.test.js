import React from "react";
import { shallow } from "enzyme";
import ExploreForm from "./ExploreForm";

describe("ExploreForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ExploreForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
