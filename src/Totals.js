import React, { Component } from 'react';


export default class Totals extends Component {


 constructor(props) {


    super(props)
    console.log("totals constructor")

    console.log(this.props);

  }





  render() {



    return (


<table className="totals-table">
            <thead>
              <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th>Total after {this.props.totalData.year} year{this.props.totalData.year !==1? 's' : ''} </th>
              </tr>
            </thead>
            <tbody>


              <tr>
                <td>Revenue</td>
                <td>${(this.props.totalData.oneTimeRevenue).toFixed(2)}</td> 
                <td>${(this.props.totalData.monthlyRevenue).toFixed(2)}</td>
                <td>${this.props.totalData.totalRevenue.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Expenses</td>
                <td>${(this.props.totalData.oneTimeExpense).toFixed(2)}</td>
                <td>${(this.props.totalData.monthlyExpense).toFixed(2)}</td>
                <td>${this.props.totalData.totalExpense.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Contribution Profit</td>
                <td></td>
                <td>${ this.props.totalData.monthlyContributionProfit.toFixed(2)}</td>
                <td>${ this.props.totalData.totalContributionProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Contribution Margin</td>
                <td></td>
                <td></td>
                <td>{this.props.totalData.contributionMargin}%</td>
              </tr>
              <tr>
                <td>Capital ROI (monthly)</td>
                <td></td>
                <td></td>
                <td>{this.props.totalData.capitalROI}</td>
              </tr>
            </tbody>
          </table>


    );
  }






  }