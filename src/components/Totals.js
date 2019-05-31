import React from 'react'
import { Table } from 'react-bootstrap'


const Totals = (
  {
    monthlyContributionProfit,
    totalContributionProfit,
    contributionMargin,
    capitalROI
  }
) => {
return (
  <Table>
    <tbody>
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
    </tbody>
  </Table>
  )
}
export default Totals
