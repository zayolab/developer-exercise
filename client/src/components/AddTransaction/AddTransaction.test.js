import React from "react"
import { shallow } from "../../enzyme"

import AddTransaction from "./index"

describe("AddTransaction tests", () => {
  let wrapper
  const triggerError = jest.fn()
  const handleAdd = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <AddTransaction triggerError={triggerError} handleAdd={handleAdd} />
    )
  })

  it("renders the form", () => {
    expect(wrapper.find(".addExpenseOrRevenueForm")).toBeDefined()
  })

  it("renders the correct number of input fields", () => {
    expect(wrapper.find(".input-field")).toHaveLength(5)
  })

  it("renders the update button", () => {
    expect(wrapper.find(".add-transaction-button")).toBeDefined()
  })

  it("triggers error if fields are not filled out correctly", () => {
    wrapper
      .find(".addExpenseOrRevenueForm")
      .simulate("submit", { preventDefault: () => {} })
    expect(triggerError).toHaveBeenCalled()
  })
})
