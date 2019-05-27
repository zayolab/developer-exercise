import React from "react"
import { mount } from "../../enzyme"

import SetTimePeriod from "./index"

describe("SetTimePeriod tests", () => {
  let wrapper
  const handleTimePeriodChange = jest.fn()

  beforeEach(() => {
    const timePeriod = 6

    wrapper = mount(
      <SetTimePeriod
        timePeriod={timePeriod}
        handleTimePeriodChange={handleTimePeriodChange}
      />
    )
  })

  it("renders the outer wrapper", () => {
    expect(wrapper.find(".set-time-period-wrapper")).toBeDefined()
  })

  it("renders the inner wrapper", () => {
    expect(wrapper.find(".time-period-select-wrapper")).toBeDefined()
  })

  it("renders the update button", () => {
    expect(wrapper.find(".time-period-update-button")).toBeDefined()
  })

  it("triggers the update callback on time period change", () => {
    wrapper
      .find(".time-period-select-wrapper select")
      .simulate("change", { target: { value: 12 } })
    wrapper.find(".time-period-update-button button").simulate("click")
    expect(handleTimePeriodChange).toHaveBeenCalled()
  })
})
