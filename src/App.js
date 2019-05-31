import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
// import InputForm from './components/InputForm.js';
import Totals from './components/Totals.js';
import DataTable from './components/DataTable.js';

class App extends Component {
  constructor() {
    super()
    // "seed" data initially
    this.state = {
      revenue: [
      {
        name: 'Item 1',
        oneTime: 100,
        monthly: 50
      },
      {
        name: 'Item 2',
        oneTime: 50,
        monthly: 25
      },
      {
        name: 'Item 3',
        oneTime: 25,
        monthly: 85
      }],
      expenses:[{
        name: 'Expense 1',
        oneTime: 500,
        monthly: 20.00
      },
      {
        name: 'Expense 2',
        oneTime: 200,
        monthly: 40
      }],
      oneTimeRevenue: 175,
      oneTimeExpense: 700,
      monthlyRevenue: 160,
      monthlyExpense: 60,
      newType: '',
      newName: '',
      newOneTime: '',
      newMonthly: '',
      error: false
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  // Delete expense or revenue from list
  handleDelete(type, index) {
    // listType will be 'expenses' or 'revenue' depending on item to delete
    let listType = this.state[type]
    // recalculate and set totals in state
    if (type === 'expenses') {
      this.setState({
        oneTimeExpense: this.state.oneTimeExpense - this.state.expenses[index]['oneTime'],
        monthlyExpense: this.state.monthlyExpense - this.state.expenses[index]['monthly'],
      })
    } else {
      // for revenue
      this.setState({
        oneTimeRevenue: this.state.oneTimeRevenue - this.state.revenue[index]['oneTime'],
        monthlyRevenue: this.state.monthlyRevenue - this.state.revenue[index]['monthly'],
      })
    }
    // remove list item from state array
    this.setState({
      [listType]: listType.splice(index, 1),
    })
  }

  // add new expense or revenue
  handleAdd(e) {
    e.preventDefault()
    // handle form errors, allows one-time and revenue amounts to be 0
    if (!this.state.newType || !this.state.newName || (!this.state.newOneTime && this.state.newOneTime !== 0) || (!this.state.newMonthly && this.state.newMonthly !== 0)) {
      this.setState({
        error: true
      })
    }
    // if there are no form errors, add accordingly
    else {
      // typeOfAmount will be either 'expenses' or 'revenue'
      let typeOfAmount = this.state.newType
      let monthly = typeOfAmount === 'expenses' ? 'monthlyExpense' : 'monthlyRevenue'
      let oneTime = typeOfAmount === 'expenses' ? 'oneTimeExpense' : 'oneTimeRevenue'
      // grab state array of revenues or expenses
      let items = this.state[typeOfAmount]
      items.push({
        name: this.state.newName,
        oneTime:this.state.newOneTime,
        monthly: this.state.newMonthly
      })
      // set state with new totals and items array, clear errors displaying and form contents
      this.setState({
        error: false,
        [typeOfAmount]: items,
        [monthly]: this.state[monthly] + this.state.newMonthly,
        [oneTime]: this.state[oneTime] + this.state.newOneTime,
      })
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
        <div className="App">
          <div className="container">

              <Header />

              {/*<InputForm
                handleTypeChange={this.handleTypeChange}
                handleNameChange={this.handleNameChange}
                handleMonthlyChange={this.handleMonthlyChange}
                handleOneTimeChange={this.handleOneTimeChange}
                handleAdd={this.handleAdd}/>*/}

              <DataTable
                moneyList = {this.state.revenue}
                handleDelete = {this.handleDelete}
                name={"revenue"}
              />

              <DataTable
                handleDelete = {this.handleDelete}
                moneyList = {this.state.expenses}
                name={"expenses"}
              />

              <Totals
                monthlyContributionProfit = { monthlyContributionProfit }
                totalContributionProfit = { totalContributionProfit }
                contributionMargin = { contributionMargin }
                capitalROI = { capitalROI }
              />
          </div>
        </div>
      );
    }
  }


export default App;
