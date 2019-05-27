import React from "react"
import PropTypes from "prop-types"
import "./totals.css"

const Totals = ({ children }) => (
  <table className="totals-table">
    <thead>
      <tr>
        <th />
        <th>One-Time</th>
        <th>Monthly</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody className="totals-table-body">{children}</tbody>
  </table>
)

Totals.propTypes = {
  children: PropTypes.node.isRequired
}

export default Totals
