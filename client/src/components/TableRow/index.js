import React from "react"
import { Button } from "react-bootstrap"
import PropTypes from "prop-types"

const TableRow = ({ type, item, handleDelete }) => (
  <tr key={item.id}>
    <td>{item.name}</td>
    <td>${Number(item.one_time).toFixed(2)}</td>
    <td>${Number(item.monthly).toFixed(2)}</td>
    <td>
      <Button onClick={() => handleDelete(type, item)}>Delete</Button>
    </td>
  </tr>
)

TableRow.propTypes = {
  type: PropTypes.oneOf(["revenue", "expenses"]).isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    one_time: PropTypes.string.isRequired,
    monthly: PropTypes.string.isRequired
  }).isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default TableRow
