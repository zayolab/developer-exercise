import React from "react"
import { shallow } from "../../enzyme"

import CapitalROIRow from "./index"

describe("ContributionMarginRow tests", () => {
  let wrapper

  beforeEach(() => {
    const capitalROI = "12.7"
    wrapper = shallow(<CapitalROIRow capitalROI={capitalROI} />)
  })

  it("renders the Capital ROI", () => {
    // Expect the wrapper object to be defined
    expect(wrapper.find(".capital-roi")).toBeDefined()
  })

  it("renders correct Capital ROI", () => {
    //Expect the wrapper's to display the correct text value
    expect(wrapper.find(".capital-roi").text()).toEqual("12.7")
  })
})
