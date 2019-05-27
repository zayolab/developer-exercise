import React from "react"
import { mount } from "../../enzyme"

import Transactions from "./index"

const mockTransactions = [
  {
    id: 1,
    name: "Transaction 1",
    one_time: "300",
    monthly: "25"
  },
  {
    id: 2,
    name: "Transaction 2",
    one_time: "125.00",
    monthly: "50.00"
  },
  {
    id: 3,
    name: "Transaction 3",
    one_time: "450.00",
    monthly: "75.00"
  }
]

describe("Transactions tests", () => {
  let wrapper

  beforeEach(() => {
    const type = "revenue"
    const handleDelete = jest.fn()
    const handleUpdate = jest.fn()
    wrapper = mount(
      <Transactions
        type={type}
        transactions={mockTransactions}
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
