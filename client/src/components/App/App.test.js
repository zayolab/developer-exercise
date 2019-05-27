import React from "react"
import ReactDOM from "react-dom"
import { mount } from "../../enzyme"
import App from "./index"

describe("App tests", () => {
  let wrapper
  const handleDelete = jest.fn()
  const handleUpdate = jest.fn()

  beforeEach(() => {
    const timePeriod = 6

    wrapper = mount(<App />)
  })

  it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<App />, div)
  })

  it("renders the AddTransaction Component", () => {
    expect(wrapper.find("AddTransaction")).toBeDefined()
  })

  it("renders the SetTimePeriod Component", () => {
    expect(wrapper.find("SetTimePeriod")).toBeDefined()
  })
})
