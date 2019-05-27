import React from "react"
import PropTypes from "prop-types"

const TransactionTotalsRow = ({ title, oneTime, monthly, total }) => (
  <tr>
    <td className="transaction-totals-title">{title}</td>
    <td className="transaction-totals-onetime">${oneTime.toFixed(2)}</td>
    <td className="transaction-totals-monthly">${monthly.toFixed(2)}</td>
    <td className="transaction-totals-total">${total.toFixed(2)}</td>
  </tr>
)

TransactionTotalsRow.propTypes = {
  title: PropTypes.string.isRequired,
  oneTime: PropTypes.number.isRequired,
  monthly: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default TransactionTotalsRow
