import React from "react"
import { shallow } from "../../enzyme"

import Totals from "./index"

describe("Totals tests", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Totals>
        <p>Test</p>
      </Totals>
    )
  })

  it("renders the totals table", () => {
    expect(wrapper.find(".totals-table")).toBeDefined()
  })

  it("renders children", () => {
    expect(wrapper.find(".totals-table-body").props().children).toBeDefined()
  })
})
