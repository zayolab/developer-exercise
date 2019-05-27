import React from "react"
import { shallow } from "../../enzyme"

import TransactionTotalsRow from "./index"

describe("TransactionTotalsRow tests", () => {
  let wrapper

  beforeEach(() => {
    const title = "Revenue"
    const oneTime = 300
    const monthly = 25
    const total = 600

    wrapper = shallow(
      <TransactionTotalsRow
        title={title}
        oneTime={oneTime}
        monthly={monthly}
        total={total}
      />
    )
  })

  it("renders the transaction title", () => {
    expect(wrapper.find(".transaction-totals-title")).toBeDefined()
  })

  it("renders the one-time transaction amount", () => {
    expect(wrapper.find(".transaction-totals-onetime")).toBeDefined()
  })

  it("renders the monthly transaction amount", () => {
    expect(wrapper.find(".transaction-totals-monthly")).toBeDefined()
  })

  it("renders the total transaction amount", () => {
    expect(wrapper.find(".transaction-totals-total")).toBeDefined()
  })

  it("renders correct transaction list title", () => {
    expect(wrapper.find(".transaction-totals-title").text()).toEqual("Revenue")
  })

  it("renders correct one-time transaction amount", () => {
    expect(wrapper.find(".transaction-totals-onetime").text()).toEqual(
      "$300.00"
    )
  })

  it("renders correct monthly transaction amount", () => {
    expect(wrapper.find(".transaction-totals-monthly").text()).toEqual("$25.00")
  })

  it("renders correct total transaction amount", () => {
    expect(wrapper.find(".transaction-totals-total").text()).toEqual("$600.00")
  })
})
