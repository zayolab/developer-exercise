import React, { Component } from 'react';

import './App.css';

class Totals extends React.Component{

    constructor(props) {

        super(props);
        this.state = {

            tableFromParent: null

        };


    }
    


    render() {

        return (
            <table className="totals-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>One-Time</th>
                        <th>Monthly</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Revenue</td>
                        <td>${this.props.oneTimeRevenue}</td>
                        <td>${this.props.monthlyRevenue}</td>
                        <td>${this.props.totalRevenue}</td>
                    </tr>
                    <tr>
                        <td>Expenses</td>
                        <td>${this.props.oneTimeExpense}</td>
                        <td>${this.props.monthlyExpense}</td>
                        <td>${this.props.totalExpense}</td>
                    </tr>
                    <tr>
                        <td>Contribution Profit</td>
                        <td></td>
                        <td>${this.props.monthlyContribution}</td>
                        <td>${this.props.totalContribution}</td>
                    </tr>
                    <tr>
                        <td>Contribution Margin</td>
                        <td></td>
                        <td></td>
                        <td>{this.props.contributionMargin}%</td>
                    </tr>
                    <tr>
                        <td>Capital ROI (monthly)</td>
                        <td></td>
                        <td></td>
                        <td>{this.props.capitalROI}</td>
                    </tr>
                </tbody>
            </table>
               )
    }

}



export default Totals;