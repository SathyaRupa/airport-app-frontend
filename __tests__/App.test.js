import React from "react";
import {render} from "@testing-library/react-native"
import App from "../App";

describe('App screen', () => {
  it('should render App', () => {
    expect(render(<App/>)).toBeTruthy();
  })
})