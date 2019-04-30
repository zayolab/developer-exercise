import React, { Component } from 'react';
import ROITable from './components/ROITable';
import TotalsTable from './components/TotalsTable';
import AddExpenseOrRevenueForm from './components/AddExpenseOrRevenueForm'; 
import ErrorMessage from './components/ErrorMessage';
import TimeFrameForm from './components/TimeFrameForm';
import './App.css';
import { fetchData, postData, deleteData, postTimeFrame } from './api';

class App extends Component {
  constructor() {
    super()
    this.state = {
      revenue: null,
      expenses: null,
      oneTimeRevenue: null,
      oneTimeExpense: null,
      monthlyRevenue: null,
      monthlyExpense: null,

      // calculated in backend GET
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
      // for dynamic totals
      newTimeFrame: '',
      error: false
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)

    // controlled form elements functions
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this)
    this.handleTimeFrameChange = this.handleTimeFrameChange.bind(this)
  }
  
  componentDidMount() {
    // load data, timeFrame default 12
    this.getROIData();
  }

  // calls fetchData api function and then sets state
  getROIData = () => {
    // If time frame is changed from default 12, persist that when adding or deleting
    if (this.state.newTimeFrame) {
      const tfObj = {timeFrame: this.state.newTimeFrame};
      postTimeFrame(tfObj).then(data => {
        if (data) {
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
        }
      })
    }
    // fetch from GET all roi calculations endpiont with timeframe default 12
    fetchData().then(data => {
      if (data) {
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
      }
    })
  }
  
  // Delete expense or revenue from list
  handleDelete(type, id) {
    // Calls api delete method
    deleteData(type, id).then(() => {
      // update state
      this.getROIData();
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
  handleTimeFrameChange(e) {
    this.setState({
      newTimeFrame: Number(e.target.value)
    })
    const tfObj = { timeFrame: Number(e.target.value)}
    postTimeFrame(tfObj).then(data => {
      if (data) {
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
      }
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
      // Create newItem obj to match expected req.body
      let newItem = {
        type: typeOfAmount,
        name: this.state.newName,
        oneTime: this.state.newOneTime,
        monthly: this.state.newMonthly,
        timeFrame: this.state.newTimeFrame
      }
      // Sends newItem to POST endpoint
      postData(newItem).then(() => {
        // update state
        this.getROIData();
      })
      // clear errors displaying and form contents
      this.setState({
        error: false,
        newName: '',
        newMonthly: '',
        newOneTime: '',
        newType: ''
      })
    }
  }

  render() {
    if (!this.state.revenue) {
      return (<p>Loading...</p>);
    }

    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        {/* Add new expense or revenue form */}
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
          {/* Time Frame Form */}
          <TimeFrameForm 
            handleTimeFrameChange={this.handleTimeFrameChange}
            newTimeFrame={this.state.newTimeFrame}
          />
          {/* Totals Table */}
          <TotalsTable 
            oneTimeRevenue={this.state.oneTimeRevenue}
            monthlyRevenue={this.state.monthlyRevenue}
            totalRevenue={this.state.totalRevenue}
            oneTimeExpense={this.state.oneTimeExpense}
            monthlyExpense={this.state.monthlyExpense}
            totalExpense={this.state.totalExpense}
            monthlyContributionProfit={this.state.monthlyContributionProfit}
            totalContributionProfit={this.state.totalContributionProfit}
            contributionMargin={this.state.contributionMargin}
            capitalROI={this.state.capitalROI}
            handleTimeFrameChange={this.handleTimeFrameChange}
            newTimeFrame={this.state.newTimeFrame}
          />
        </div>
      </div>
    );
  }
}

export default App;
