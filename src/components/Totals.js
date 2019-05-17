import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../App.css'
import { getTotals } from '../redux/selectors/totalSelectors'
import { updateMonthTerm, totals ,resultsFetchData } from '../redux/action/actions'

class Totals extends Component {

  componentDidMount() {
    this.props.resultsFetchData(this.props.total.totals)
  }
  //To update month term
  handleMonthTerm = (e) => {
    //Dispatch action to update month term
    this.props.updateMonthTerm(e.target.value);
    //Dispatch action to update results
    let totalSum = this.props.total.totals;
    totalSum.monthTerm = parseInt(e.target.value);
    this.props.resultsFetchData(totalSum);
  }

  render() {

    // create table rows for result list
    if(!this.props.isLoaded){
      return <p>Loading…</p>;
    } 
    else if (this.props.isLoaded) {
      return (
        <div className="flex-large">
          <h4> Results </h4>
          <Table striped responsive  className="totals-table">
            <thead>
              <tr>
                <th> Month Term </th>
                <th>
                  <select className="monthTermDropDown" value={this.props.total.totals.monthTerm} onChange={this.handleMonthTerm}>
                    <option value="12">12-months</option>
                    <option value="24">24-months</option>
                    <option value="36">36-months</option>
                    <option value="48">48-months</option>
                    <option value="60">60-months</option>
                  </select>
                </th>
                <th colSpan="2"></th>
              </tr>
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
                <td>${(this.props.total.totals.oneTimeRevenue).toFixed(2)}</td>
                <td>${(this.props.total.totals.monthlyRevenue).toFixed(2)}</td>
                <td>${(this.props.results.totalRevenue).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Expenses</td>
                <td>${(this.props.total.totals.oneTimeExpense).toFixed(2)}</td>
                <td>${(this.props.total.totals.monthlyExpense).toFixed(2)}</td>
                <td>${(this.props.results.totalExpense).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Contribution Profit</td>
                <td></td>
                <td>${(this.props.results.monthlyContributionProfit).toFixed(2)}</td>
                <td>${(this.props.results.totalContributionProfit).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Contribution Margin</td>
                <td></td>
                <td></td>
                <td>{this.props.results.contributionMargin}%</td>
              </tr>
              <tr>
                <td>Capital ROI (monthly)</td>
                <td></td>
                <td></td>
                <td>{this.props.results.capitalROI}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { revenueItems } = state;
  const { expenseItems} = state;
  getTotals(state,revenueItems, expenseItems);
  return {
    total: state.totals,
    revenueItems: state.revenueItems,
    expenseItems: state.expenseItems,
    results: state.results.results,
    isLoaded: state.results.isLoaded,
  };
}

export default connect(mapStateToProps,{updateMonthTerm, totals, resultsFetchData } )(Totals);
