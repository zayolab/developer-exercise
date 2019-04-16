import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TotalsSummary extends Component {
  render() {
    return (
      <>
            <tbody>
              <tr>
                <td>{this.props.R1}</td>
                <td>${(this.props.oneTimeRevenue).toFixed(2)}</td>
                <td>${(this.props.monthlyRevenue).toFixed(2)}</td>
                <td>${(this.props.totalRevenue).toFixed(2)}</td>
              </tr>
              <tr>
                <td>{this.props.R2}</td>
                <td>${(this.props.oneTimeExpense).toFixed(2)}</td>
                <td>${(this.props.monthlyExpense).toFixed(2)}</td>
                <td>${(this.props.totalExpense).toFixed(2)}</td>
              </tr>
              <tr>
                <td>{this.props.R3}</td>
                <td></td>
                <td>${ this.props.monthlyContributionProfit.toFixed(2)}</td>
                <td>${ this.props.totalContributionProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <td>{this.props.R4}</td>
                <td></td>
                <td></td>
                <td>{this.props.contributionMargin}%</td>
              </tr>
              <tr>
                <td>{this.props.R5}</td>
                <td></td>
                <td></td>
                <td>{this.props.capitalROI}</td>
              </tr>
            </tbody>
      </>
    )
  }
}

export default TotalsSummary

TotalsSummary.propTypes = {
    R1: PropTypes.string.isRequired,
    R2: PropTypes.string.isRequired,
    R3: PropTypes.string.isRequired,
    R4: PropTypes.string.isRequired,
    R5: PropTypes.string.isRequired,
    oneTimeRevenue: PropTypes.number.isRequired,
    monthlyRevenue: PropTypes.number.isRequired,
    totalRevenue: PropTypes.number.isRequired,
    oneTimeExpense: PropTypes.number.isRequired,
    monthlyExpense: PropTypes.number.isRequired,
    totalExpense: PropTypes.number.isRequired,
    monthlyContributionProfit: PropTypes.number.isRequired,
    totalContributionProfit: PropTypes.number.isRequired,
    contributionMargin: PropTypes.string.isRequired,
    capitalROI: PropTypes.string.isRequired
  }
  