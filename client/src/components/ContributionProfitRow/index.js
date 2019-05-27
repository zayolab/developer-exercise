import React from "react"
import PropTypes from "prop-types"

const ContributionProfitRow = ({
  monthlyContributionProfit,
  totalContributionProfit
}) => {
  return (
    <tr>
      <td>Contribution Profit</td>
      <td />
      <td className="monthly-contribution-profit">
        ${monthlyContributionProfit.toFixed(2)}
      </td>
      <td className="total-contribution-profit">
        ${totalContributionProfit.toFixed(2)}
      </td>
    </tr>
  )
}

ContributionProfitRow.propTypes = {
  monthlyContributionProfit: PropTypes.number.isRequired,
  totalContributionProfit: PropTypes.number.isRequired
}

export default ContributionProfitRow
