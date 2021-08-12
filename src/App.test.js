import React from "react";
import { shallow } from "enzyme";
import App from './App';

test('renders learn react link', () => {
  const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tab")).toHaveLength(1);
    expect(wrapper.find("header")).toHaveLength(1);
});
