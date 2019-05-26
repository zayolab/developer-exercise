import React from "react"
import PropTypes from "prop-types"
import TableRow from "../TableRow"
import { transactionProp } from "../../proptypes/transaction"
import "./transactions.css"

const Transactions = ({ type, transactions, handleDelete }) => {
  const tableData = transactions.map(transaction => (
    <TableRow
      type={type}
      key={transaction.id}
      item={transaction}
      handleDelete={handleDelete}
    />
  ))

  return (
    <table className={`${type}-table`}>
      <thead>
        <tr>
          <th>{type.toUpperCase()}</th>
        </tr>
        <tr>
          <th />
          <th>One-Time</th>
          <th>Monthly</th>
          <th />
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  )
}

Transactions.propTypes = {
  type: PropTypes.oneOf(["revenue", "expenses"]).isRequired,
  transactions: PropTypes.arrayOf(transactionProp.isRequired).isRequired
}

export default Transactions
