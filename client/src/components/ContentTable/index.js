import React from "react"
import PropTypes from "prop-types"
import "./contenttable.css"

const ContentTable = ({ type, data }) => (
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
    <tbody>{data}</tbody>
  </table>
)

ContentTable.propTypes = {
  type: PropTypes.oneOf(["revenue", "expenses"]).isRequired,
  data: PropTypes.array.isRequired
}

export default ContentTable
