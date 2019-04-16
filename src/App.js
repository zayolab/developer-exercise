import React, { Component } from 'react';
//import {
//  Row,
//  Col,
//  Button,
//  Form
// } from 'react-bootstrap';
import './App.css';
import AddTransaction from './components/AddTransaction';
import RevenueTransactionList from './components/RevenueTransactionList';
import ExpenseTransactionList from './components/ExpenseTransactionList';
import uniqueID from './id';

class App extends Component {
  constructor() {
    super()
    // "seed" data initially
    this.state = {
      revenue: [
      {
        id: uniqueID(),
        name: 'Item 1',
        oneTime: 100,
        monthly: 50
      },
      {
        id: uniqueID(),
        name: 'Item 2',
        oneTime: 50,
        monthly: 25
      },
      {
        id: uniqueID(),
        name: 'Item 3',
        oneTime: 25,
        monthly: 85
      }],
      expenses:[{
        id: uniqueID(),
        name: 'Expense 1',
        oneTime: 500,
        monthly: 20.00
      },
      {
        id: uniqueID(),
        name: 'Expense 2',
        oneTime: 200,
        monthly: 40
      }],
      oneTimeRevenue: 175,
      oneTimeExpense: 700,
      monthlyRevenue: 160,
      monthlyExpense: 60,
      transaction:{
        newType: '',
        newName: '',
        newOneTime: '',
        newMonthly: '',
      },
      error: false
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)

    // controlled form elements functions
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this)
  }

  // delete matching id.
  handleDelete(type, id) {
    let match;

    // recalculate and set totals in state
    if (type === 'expenses') {
      match = this.state.expenses.find( x => x.id === id );

      this.setState({
        oneTimeExpense: this.state.oneTimeExpense - match['oneTime'],
        monthlyExpense: this.state.monthlyExpense - match['monthly'],
      })
      this.setState({ expenses: [...this.state.expenses.filter(x => x.id !== id)] });

    } else {
      match = this.state.revenue.find( x => x.id === id );

      // for revenue
      this.setState({
        oneTimeRevenue: this.state.oneTimeRevenue - match['oneTime'],
        monthlyRevenue: this.state.monthlyRevenue - match['monthly'],
      })
      this.setState({ revenue: [...this.state.revenue.filter(x => x.id !== id)] });
      
    }
  }

  // controlled form elements, watch for changes
  handleTypeChange(e) {
    let transaction = Object.assign({}, this.state.transaction);
    transaction.newType = e.target.value;
    this.setState({transaction});
  }
  handleNameChange(e) {
    let transaction = Object.assign({}, this.state.transaction);
    transaction.newName = e.target.value;
    this.setState({transaction});
  }

  handleMonthlyChange(e) {
    let transaction = Object.assign({}, this.state.transaction);
    transaction.newMonthly = Number(e.target.value);
    this.setState({transaction});
  }
  handleOneTimeChange(e) {
    let transaction = Object.assign({}, this.state.transaction);
    transaction.newOneTime = Number(e.target.value);
    this.setState({transaction});
  }

  // add new expense or revenue
  handleAdd(e) {
    e.preventDefault()
    //console.log(this.state.transaction);

    // handle form errors, allows one-time and revenue amounts to be 0
    if (!this.state.transaction.newType 
      || !this.state.transaction.newName 
      || (!this.state.transaction.newOneTime && this.state.transaction.newOneTime !== 0) 
      || (!this.state.transaction.newMonthly && this.state.transaction.newMonthly !== 0)) {
        this.setState({
        error: true
      })
    }
    // if there are no form errors, add accordingly
    else {
      // typeOfAmount will be either 'expenses' or 'revenue'
      let typeOfAmount = this.state.transaction.newType
      let monthly = typeOfAmount === 'expenses' ? 'monthlyExpense' : 'monthlyRevenue'
      let oneTime = typeOfAmount === 'expenses' ? 'oneTimeExpense' : 'oneTimeRevenue'
      // grab state array of revenues or expenses
      let items = this.state[typeOfAmount]
      items.push({
        id: uniqueID(),
        name: this.state.transaction.newName,
        oneTime:this.state.transaction.newOneTime,
        monthly: this.state.transaction.newMonthly
      })
      // set state with new totals and items array, clear errors displaying and form contents
      this.setState({
        error: false,
        [typeOfAmount]: items,
        [monthly]: this.state[monthly] + this.state.transaction.newMonthly,
        [oneTime]: this.state[oneTime] + this.state.transaction.newOneTime,
      });
      //  Clear values in form
      let transaction = {
        newName: '',
        newMonthly: '',
        newOneTime: '',
        newType: ''
      };
      this.setState({transaction});
  
    }
  }

  render() {

    // Calculations for totals
    let totalRevenue = this.state.oneTimeRevenue + (this.state.monthlyRevenue * 12)
    let totalExpense = this.state.oneTimeExpense + (this.state.monthlyExpense * 12)
    let monthlyContributionProfit = this.state.monthlyRevenue - this.state.monthlyExpense
    let totalContributionProfit = totalRevenue - totalExpense
    // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
    let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0
    // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
    let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.state.oneTimeExpense - this.state.oneTimeRevenue) / monthlyContributionProfit).toFixed(1)

    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        {/* Add new expense or revenue form */}
        <AddTransaction 
          handleAdd={this.handleAdd} 
          handleTypeChange={this.handleTypeChange} 
          handleNameChange={this.handleNameChange}
          handleMonthlyChange={this.handleMonthlyChange}
          handleOneTimeChange={this.handleOneTimeChange}
          transaction={this.state.transaction}
        />
        {/* form errors */}
        { this.state.error &&
          <h4 className="error text-center">Please fill out all fields</h4>
        }
        <div className="roi-tables">
          {/* Revenue Table */}
          <table className="revenue-table">
            <thead>
              <tr>
                <th>Revenue</th>
              </tr>
              <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            <RevenueTransactionList 
              RevenueTransactionList={this.state.revenue} 
              handleDelete={this.handleDelete}
            />
            </tbody>
          </table>
          {/* Expenses Table */}
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Expenses</th>
              </tr>
              <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <ExpenseTransactionList 
                ExpenseTransactionList={this.state.expenses}
                handleDelete={this.handleDelete}
              />
            </tbody>
          </table>
          {/* Totals Table */}
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
                <td>${(this.state.oneTimeRevenue).toFixed(2)}</td>
                <td>${(this.state.monthlyRevenue).toFixed(2)}</td>
                <td>${totalRevenue.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Expenses</td>
                <td>${(this.state.oneTimeExpense).toFixed(2)}</td>
                <td>${(this.state.monthlyExpense).toFixed(2)}</td>
                <td>${totalExpense.toFixed(2)}</td>
              </tr>
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
          </table>
        </div>
      </div>
    );
  }
}

export default App;
