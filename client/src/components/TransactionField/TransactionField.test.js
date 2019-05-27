import React from "react"
import { mount } from "../../enzyme"

import TransactionField from "./index"

describe("TransactionField tests", () => {
  let wrapper
  const handleUpdate = jest.fn()

  beforeEach(() => {
    const format = "string"
    const id = 1
    const field = "name"
    const value = "Transaction 1"

    wrapper = mount(
      <TransactionField
        format={format}
        id={id}
        field={field}
        value={value}
        handleUpdate={handleUpdate}
      />
    )
  })

  it("renders the transaction row", () => {
    expect(wrapper.find(".transaction-field")).toBeDefined()
  })

  it("does not render the edit icon initially", () => {
    expect(wrapper.find(".edit-icon")).toHaveLength(0)
  })

  it("displays the edit icon on transaction field hover", () => {
    wrapper.find(".transaction-field").simulate("mouseover")
    expect(wrapper.find(".edit-icon")).toHaveLength(1)
    wrapper.find(".transaction-field").simulate("mouseout")
    expect(wrapper.find(".edit-icon")).toHaveLength(0)
  })

  it("show the edit input field on transaction field click", () => {
    wrapper.find(".transaction-field").simulate("click")
    expect(wrapper.find(".transaction-field")).toHaveLength(0)
    expect(wrapper.find(".transaction-field-edit input")).toBeDefined()
  })

  it("hides the edit input field on blur", () => {
    wrapper.find(".transaction-field").simulate("click")
    expect(wrapper.find(".transaction-field")).toHaveLength(0)
    expect(wrapper.find(".transaction-field-edit input")).toBeDefined()

    wrapper.find(".transaction-field-edit input").simulate("blur")
    expect(wrapper.find(".transaction-field")).toBeDefined()
    expect(wrapper.find(".transaction-field-edit input")).toHaveLength(0)
  })

  it("triggers the update callback on edit input field change", () => {
    wrapper.find(".transaction-field").simulate("click")
    wrapper
      .find(".transaction-field-edit input")
      .simulate("change", { target: { value: "testupdate" } })
    wrapper.find(".transaction-field-edit input").simulate("blur")
    expect(handleUpdate).toHaveBeenCalled()
  })
})
