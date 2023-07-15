import React from "react";
import { shallow } from "enzyme";
import LogInForm from "./LogInForm";

describe("LogInForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LogInForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
