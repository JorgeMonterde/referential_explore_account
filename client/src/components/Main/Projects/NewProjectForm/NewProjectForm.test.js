import React from "react";
import { shallow } from "enzyme";
import NewProjectForm from "./NewProjectForm";

describe("NewProjectForm", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NewProjectForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
