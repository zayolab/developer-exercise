import React from "react"
import { shallow } from "../../enzyme"

import LoadingSpinner from "./index"

describe("ErrorMessage tests", () => {
  it("renders the loading spinner SVG", () => {
    const wrapper = shallow(<LoadingSpinner />)
    expect(wrapper.find(".lds-eclipse")).toBeDefined()
  })
})
