import React from "react"
import PropTypes from "prop-types"
import TransactionRow from "../TransactionRow"
import { transactionProp } from "../../proptypes/transaction"
import "./transactions.css"

const Transactions = ({ type, transactions, handleDelete, handleUpdate }) => {
  const tableData = transactions.map(transaction => (
    <TransactionRow
      type={type}
      key={transaction.id}
      item={transaction}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  ))

  return (
    <table className={`${type}-table`}>
      <thead>
        <tr>
          <th className="transactions-header">
            {type[0].toUpperCase() + type.substring(1)}
          </th>
        </tr>
        <tr>
          <th />
          <th>One-Time</th>
          <th>Monthly</th>
          <th />
        </tr>
      </thead>
      <tbody className="transaction-rows">{tableData}</tbody>
    </table>
  )
}

Transactions.propTypes = {
  type: PropTypes.oneOf(["revenue", "expenses"]).isRequired,
  transactions: PropTypes.arrayOf(transactionProp.isRequired).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
}

export default Transactions
