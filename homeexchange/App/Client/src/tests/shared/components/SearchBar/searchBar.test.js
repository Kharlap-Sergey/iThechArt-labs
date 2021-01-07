import React from "react";
import renderer from "react-test-renderer";
import SearchBar from "shared/components/searchBar/SearchBar";

test("expected component will have search-bar-container class", () => {
  const component = renderer.create(<SearchBar val="" isOpen={false} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(component.root.children[0].props.className).toBe(
    "search-bar-container"
  );
});

test("expected component will have open state class", () => {
  const component = renderer.create(<SearchBar val="" isOpen={true} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(component.root.children[0].props.className).toBe(
    "search-bar-container search-bar-container--show"
  );
});

test("expect component change tree via props", () => {
  let root;
  renderer.act(() => {
    root = renderer.create(<SearchBar val="" isOpen={false} />);
  });

  expect(root.toJSON()).toMatchSnapshot();

  renderer.act(() => {
    root.update(<SearchBar val="" isOpen={true} />);
  });
  expect(root.toJSON()).toMatchSnapshot();
});

test("expect component change val", () => {
  let root;
  renderer.act(() => {
    root = renderer.create(<SearchBar val="" isOpen={true} />);
  });

  expect(root.toJSON()).toMatchSnapshot();

  const someVale = "some lasdjfaklsdf";
  renderer.act(() => {
    root.update(<SearchBar val={someVale} isOpen={true} />);
  });
  expect(root.toJSON()).toMatchSnapshot();
  expect(
    root.root.findByProps({ placeholder: "Search by location..." }).props.value
  ).toBe(someVale);
});
