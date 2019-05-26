import React from "react"
import PropTypes from "prop-types"

const TransactionTotalsRow = ({ title, oneTime, monthly, total }) => (
  <tr>
    <td>{title}</td>
    <td>${oneTime.toFixed(2)}</td>
    <td>${monthly.toFixed(2)}</td>
    <td>${total.toFixed(2)}</td>
  </tr>
)

TransactionTotalsRow.propTypes = {
  title: PropTypes.string.isRequired,
  oneTime: PropTypes.number.isRequired,
  monthly: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default TransactionTotalsRow
