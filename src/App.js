import React, { Component } from 'react';
import ROITable from './components/ROITable';
import TotalsTable from './components/TotalsTable';
import AddExpenseOrRevenueForm from './components/AddExpenseOrRevenueForm'; 
import ErrorMessage from './components/ErrorMessage';
import './App.css';

class App extends Component {
  constructor() {
    super()
    // "seed" data initially
    this.state = {
      revenue: null,
      expenses: null,
      oneTimeRevenue: null,
      oneTimeExpense: null,
      monthlyRevenue: null,
      monthlyExpense: null,
      // calculated in backnd GET
      totalRevenue: null,
      totalExpense: null,
      monthlyContributionProfit: null,
      totalContributionProfit: null,
      contributionMargin: null,
      capitalROI: null,

      newType: '',
      newName: '',
      newOneTime: '',
      newMonthly: '',
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
  
  componentDidMount() {
    this.fetchData();
    
  }

  // makes GET request to api/roicalculator and set state with revenues, expenses, and ROI calculations
  fetchData() {
    return fetch('http://localhost:8080/api/roicalculator')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          revenue: data.revenues,
          expenses: data.expenses,
          oneTimeRevenue: data.oneTimeRevenue,
          oneTimeExpense: data.oneTimeExpense,
          monthlyRevenue: data.monthlyRevenue,
          monthlyExpense: data.monthlyExpense,
          totalRevenue: data.totalRevenue,
          totalExpense: data.totalExpense,
          monthlyContributionProfit: data.monthlyContributionProfit,
          totalContributionProfit: data.totalContributionProfit,
          contributionMargin: data.contributionMargin,
          capitalROI: data.capitalROI,
        })
      })
      .catch(error => console.log(error));
  }

  // Still need to add this to handleAdd and test
  postData(data) {
    return fetch('http://localhost:8080/api/roicalculator', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject({
          code: res.status,
          message: res.statusText
        });
      }
      console.log(res.json())
      return res.json();
    })
    .then(() => {
      this.fetchData();
    })
    .catch(err => {
      console.log(err);
    })
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

  // controlled form elements, watch for changes
  handleTypeChange(e) {
    this.setState({
      newType: e.target.value
    })
  }
  handleNameChange(e) {
    this.setState({
      newName: e.target.value
    })
  }

  handleMonthlyChange(e) {
    this.setState({
      newMonthly: Number(e.target.value)
    })
  }
  handleOneTimeChange(e) {
    this.setState({
      newOneTime: Number(e.target.value)
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
        //  Clear values in form
        newName: '',
        newMonthly: '',
        newOneTime: '',
        newType: ''
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

    if (!this.state.revenue) {
      return (<p>Loading...</p>);
    }
    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        Add new expense or revenue form
        <AddExpenseOrRevenueForm 
          handleAdd={this.handleAdd}
          handleTypeChange={this.handleTypeChange}
          newType={this.state.newType}
          handleNameChange={this.handleNameChange}
          newName={this.state.newName}
          handleOneTimeChange={this.handleOneTimeChange}
          newOneTime={this.state.newOneTime}
          handleMonthlyChange={this.handleMonthlyChange}
          newMonthly={this.state.newMonthly}
        />
        {/* form errors */}
        <ErrorMessage 
          error={this.state.error}
          message={"Please fill out all fields"}
        />
        <div className="roi-tables">
        {/* Revenue Table */}
          <ROITable 
            data={this.state.revenue}
            handleDelete ={this.handleDelete}
            type={"revenue"}
          />
          {/* Expenses Table */}
          <ROITable 
            data={this.state.expenses}
            handleDelete ={this.handleDelete}
            type={"expenses"}
          />
          {/* Totals Table */}
          <TotalsTable 
            oneTimeRevenue={this.state.oneTimeRevenue}
            monthlyRevenue={this.state.monthlyRevenue}
            totalRevenue={totalRevenue}
            oneTimeExpense={this.state.oneTimeExpense}
            monthlyExpense={this.state.monthlyExpense}
            totalExpense={totalExpense}
            monthlyContributionProfit={monthlyContributionProfit}
            totalContributionProfit={totalContributionProfit}
            contributionMargin={contributionMargin}
            capitalROI={capitalROI}
          />
        </div>
      </div>
    );
  }
}

export default App;
