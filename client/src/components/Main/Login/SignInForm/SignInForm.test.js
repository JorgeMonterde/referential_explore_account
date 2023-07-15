import React from "react";
import { shallow } from "enzyme";
import SignInForm from "./SignInForm";

describe("SignInForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SignInForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
