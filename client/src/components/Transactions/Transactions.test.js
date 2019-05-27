import React from "react"
import { mount } from "../../enzyme"
import Transactions from "./index"
import { mockRevenue } from "../../mocks"

describe("Transactions tests", () => {
  let wrapper

  beforeEach(() => {
    const type = "revenue"
    const handleDelete = jest.fn()
    const handleUpdate = jest.fn()
    wrapper = mount(
      <Transactions
        type={type}
        transactions={mockRevenue}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    )
  })

  it("renders the correct table", () => {
    expect(wrapper.find(".revenue-table")).toBeDefined()
  })

  it("renders the transactions header", () => {
    expect(wrapper.find(".transactions-header")).toBeDefined()
  })

  it("renders the transaction rows", () => {
    expect(wrapper.find("TransactionRow")).toBeDefined()
  })

  it("renders the correct transactions header", () => {
    expect(wrapper.find(".transactions-header").text()).toEqual("Revenue")
  })

  it("renders the correct number of transaction rows", () => {
    expect(wrapper.find("TransactionRow")).toHaveLength(3)
  })
})
