import React from "react"
import { shallow } from "../../enzyme"

import ContributionProfitRow from "./index"

describe("ContributionProfitRow tests", () => {
  let wrapper

  beforeEach(() => {
    const monthlyContributionProfit = 12.4535
    const totalContributionProfit = 234.76343

    wrapper = shallow(
      <ContributionProfitRow
        monthlyContributionProfit={monthlyContributionProfit}
        totalContributionProfit={totalContributionProfit}
      />
    )
  })

  it("renders the Monthly Contribution Profit", () => {
    expect(wrapper.find(".monthly-contribution-profit")).toBeDefined()
  })

  it("renders the Total Contribution Profit", () => {
    expect(wrapper.find(".total-contribution-profit")).toBeDefined()
  })

  it("renders correct Monthly Contribution Profit", () => {
    expect(wrapper.find(".monthly-contribution-profit").text()).toEqual(
      "$12.45"
    )
  })

  it("renders correct Total Contribution Profit", () => {
    expect(wrapper.find(".total-contribution-profit").text()).toEqual("$234.76")
  })
})
