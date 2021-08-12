import React from "react";
import { mount, shallow } from "enzyme";
import Tab from "./Tab"
describe("Tab tests", () => {
const hostURL= "http://localhost:3000/";
const id="tab1"
const usaStates = [{
    link: "Texas",
    details: {
      header: "Texas",
      text: "Texas is a State from USA"
    }
  },
  {
    link: "California",
    details: {
      header: "California",
      text: "California is a State from USA"
    }
  },
  {
    link: "Washington",
    details: {
      header: "Washington",
      text: "Washington is a State from USA"
    }
  }];
    beforeEach(() => {
      });

  test("should render Tab properly", () => {
     
    const wrapper = shallow(<Tab id="Tab1" data={usaStates} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(3);
    expect(wrapper.find("h3")).toHaveLength(3);
    expect(wrapper.find("p")).toHaveLength(3);
    expect(wrapper.find("p")).toHaveLength(3);



  });
  test("should mount Tab properly", () => {
     
    const wrapper = mount(<Tab id="Tab1" data={usaStates} />);

    wrapper.find("button").first().simulate('click');   
    expect((wrapper.find("button").first().hasClass('active'))).toEqual(true);
    expect((wrapper.find("button").last().hasClass('active'))).toEqual(false);

    wrapper.find("button").last().simulate('click');   
    expect((wrapper.find("button").first().hasClass('active'))).toEqual(false);
    expect((wrapper.find("button").last().hasClass('active'))).toEqual(true);

  });
 
});
