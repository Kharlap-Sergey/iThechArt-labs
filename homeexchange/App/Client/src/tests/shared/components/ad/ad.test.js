import React from "react";
import renderer from "react-test-renderer";
import {Ad} from "shared/components/ad/Ad";

test("test", () => {
  const component = renderer.create(<Ad/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});