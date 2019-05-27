import React from "react"
import { shallow } from "../../enzyme"

import ContributionMarginRow from "./index"

describe("ContributionMarginRow tests", () => {
  let wrapper

  beforeEach(() => {
    const contributionMargin = "35.2"
    wrapper = shallow(
      <ContributionMarginRow contributionMargin={contributionMargin} />
    )
  })

  it("renders the Contribution Margin", () => {
    expect(wrapper.find(".contribution-margin")).toBeDefined()
  })

  it("renders correct Capital ROI", () => {
    expect(wrapper.find(".contribution-margin").text()).toEqual("35.2%")
  })
})
