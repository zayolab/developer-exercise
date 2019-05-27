import React from "react"
import PropTypes from "prop-types"

const CapitalROIRow = ({ capitalROI }) => {
  return (
    <tr>
      <td>Capital ROI (monthly)</td>
      <td />
      <td />
      <td className="capital-roi">{capitalROI}</td>
    </tr>
  )
}

CapitalROIRow.propTypes = {
  capitalROI: PropTypes.string.isRequired
}

export default CapitalROIRow
