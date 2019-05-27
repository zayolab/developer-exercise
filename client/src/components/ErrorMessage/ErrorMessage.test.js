import React from "react"
import { shallow } from "../../enzyme"

import ErrorMessage from "./index"

describe("ErrorMessage tests", () => {
  let wrapper

  beforeEach(() => {
    const errorMsg = "Could not display the data correctly"
    wrapper = shallow(<ErrorMessage errorMsg={errorMsg} />)
  })

  it("renders the error message header", () => {
    expect(wrapper.find(".error")).toBeDefined()
  })

  it("renders correct error message", () => {
    expect(wrapper.find(".error").text()).toEqual(
      "Could not display the data correctly"
    )
  })

  it("contains the correct text-center class", () => {
    const wrapperProps = wrapper.find(".error").props()
    expect(wrapperProps.className).toMatch(/text-center/)
  })
})
