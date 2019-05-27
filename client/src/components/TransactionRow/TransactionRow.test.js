import React from "react"
import { shallow } from "../../enzyme"

import TransactionRow from "./index"
import { mockRevenue } from "../../mocks"

describe("TransactionRow tests", () => {
  let wrapper
  const handleDelete = jest.fn()
  const handleUpdate = jest.fn()

  beforeEach(() => {
    const type = "revenue"

    wrapper = shallow(
      <TransactionRow
        type={type}
        item={mockRevenue[0]}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    )
  })

  it("renders the transaction row", () => {
    expect(wrapper.find(".transaction-row")).toBeDefined()
  })

  it("renders the transaction delete button", () => {
    expect(wrapper.find(".transaction-delete-button")).toBeDefined()
  })

  it("renders the transaction fields", () => {
    expect(wrapper.find("TransactionField")).toBeDefined()
  })

  it("renders the correct number of transaction fields", () => {
    expect(wrapper.find("TransactionField")).toHaveLength(3)
  })

  it("triggers the delete callback when button is clicked", () => {
    wrapper.find(".transaction-delete-button").simulate("click")
    expect(handleDelete).toHaveBeenCalled()
    wrapper.find(".transaction-delete-button").simulate("click")
    expect(handleDelete).toHaveBeenCalledTimes(2)
  })

  // "transaction-delete-button"
})
