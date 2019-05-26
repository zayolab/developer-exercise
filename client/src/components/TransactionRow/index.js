import React from "react"
import { Button } from "react-bootstrap"
import PropTypes from "prop-types"
import TransactionField from "../TransactionField"
import { transactionProp } from "../../proptypes/transaction"

const TransactionRow = ({ type, item, handleDelete, handleUpdate }) => (
  <tr key={item.id}>
    <td>
      <TransactionField
        format="string"
        id={item.id}
        type={type}
        field="name"
        value={item.name}
        handleUpdate={handleUpdate}
      />
    </td>
    <td>
      <TransactionField
        format="number"
        id={item.id}
        type={type}
        field="one_time"
        value={Number(item.one_time)}
        handleUpdate={handleUpdate}
      />
    </td>
    <td>
      <TransactionField
        format="number"
        id={item.id}
        type={type}
        field="monthly"
        value={Number(item.monthly)}
        handleUpdate={handleUpdate}
      />
    </td>
    <td>
      <Button variant="danger" onClick={() => handleDelete(type, item)}>
        Delete
      </Button>
    </td>
  </tr>
)

TransactionRow.propTypes = {
  type: PropTypes.oneOf(["revenue", "expenses"]).isRequired,
  item: transactionProp.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
}

export default TransactionRow
