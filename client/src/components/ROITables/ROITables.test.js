import React from "react"
import { mount } from "../../enzyme"
import RoiTables from "./index"
import { mockRevenue, mockExpenses } from "../../mocks"

describe("RoiTables tests", () => {
  let wrapper
  const handleDelete = jest.fn()
  const handleUpdate = jest.fn()

  beforeEach(() => {
    const timePeriod = 6

    wrapper = mount(
      <RoiTables
        revenue={mockRevenue}
        expenses={mockExpenses}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        timePeriod={timePeriod}
      />
    )
  })

  it("renders the correct transactions tables", () => {
    expect(wrapper.find("Transactions")).toHaveLength(2)
  })

  it("renders the totals table", () => {
    expect(wrapper.find("Totals")).toBeDefined()
  })

  it("renders to transactions totals rows", () => {
    expect(wrapper.find("TransactionTotalsRow")).toHaveLength(2)
  })

  it("renders to contribution profit row", () => {
    expect(wrapper.find("ContributionProfitRow")).toBeDefined()
  })

  it("renders to contribution margin row", () => {
    expect(wrapper.find("ContributionMarginRow")).toBeDefined()
  })

  it("renders to capital ROI row", () => {
    expect(wrapper.find("CapitalROIRow")).toBeDefined()
  })
})
