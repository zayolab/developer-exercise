import React from 'react'

const totalROI = (
  {
    monthlyContributionProfit,
    totalContributionProfit,
    contributionMargin,
    capitalROI
 }
  ) => {
    return(
      <tr>
        <td>Contribution Profit</td>
        <td></td>
        <td>${ monthlyContributionProfit.toFixed(2)}</td>
        <td>${ totalContributionProfit.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Contribution Margin</td>
        <td></td>
        <td></td>
        <td>{contributionMargin}%</td>
      </tr>
      <tr>
        <td>Capital ROI (monthly)</td>
        <td></td>
        <td></td>
        <td>{capitalROI}</td>
      </tr>
  )
}
export default totalROI
