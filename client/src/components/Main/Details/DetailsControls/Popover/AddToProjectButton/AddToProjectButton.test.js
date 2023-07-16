import React from "react";
import { shallow } from "enzyme";
import AddToProjectButton from "./AddToProjectButton";

describe("AddToProjectButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<AddToProjectButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
