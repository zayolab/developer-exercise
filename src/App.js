import React, { Component } from 'react';
import {ChooseTermLength} from './ChooseTermLength';
import {DisplayRoiTable} from './DisplayRoiTable';
import {AddNewItemForm} from './AddNewItemForm';
import {getRevenueTableData} from './getRevenueTableData';
import {getExpensesTableData} from './getExpensesTableData';
import {stateSeedInfo} from './stateSeedInfo';
import {handleAdd} from './handleAdd';
import {handleDelete} from './handleDelete';
import './App.css';


class App extends Component {
  constructor() {
    super()
    // "seed" data initially
    this.state = stateSeedInfo;

    this.handleDeleteItem = this.handleDeleteItem.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)

    // controlled form elements functions
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this)

    this.handleTermChange = this.handleTermChange.bind(this)

    this.setNewState = this.setNewState.bind(this)
  }

  setNewState(newState){
    this.setState({newState});
  }

  // add new expense or revenue
  handleAddItem(e) {
    e.preventDefault()
    
    this.setState(handleAdd(this.state, this.setNewState));  
  }
  // Delete expense or revenue from list
  handleDeleteItem(type, index) {
    handleDelete(this.state, this.setNewState, type, index);
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

  handleTermChange(e) {
    this.setState({
      newTerm: e.target.value
     })
  }

  render() {
    let revenueTableData = getRevenueTableData(this.state.revenue, this.handleDeleteItem);
    let expensesTableData = getExpensesTableData(this.state.expenses, this.handleDeleteItem);
    let termLength = this.state.newTerm
    let totalRevenue = this.state.oneTimeRevenue + (this.state.monthlyRevenue * termLength)
    let totalExpense = this.state.oneTimeExpense + (this.state.monthlyExpense * termLength)
    let monthlyContributionProfit = this.state.monthlyRevenue - this.state.monthlyExpense
    let totalContributionProfit = totalRevenue - totalExpense
    // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
    let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0
    // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
    let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.state.oneTimeExpense - this.state.oneTimeRevenue) / monthlyContributionProfit).toFixed(1)

    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        {/* Select term length form*/}
        <ChooseTermLength 
          newTerm={termLength}
          onTermChange={this.handleTermChange}
          />
        {/* Add new expense or revenue form */}
        <AddNewItemForm
          onTypeChange={this.handleTypeChange}
          onNameChange={this.handleNameChange}
          onOneTimeChange={this.handleOneTimeChange}
          onMonthlyChange={this.handleMonthlyChange}
          onHandleAdd={this.handleAddItem}
        />  
        {/* form errors */}
        { this.state.error &&
          <h4 className="error text-center">Please fill out all fields</h4>
        }
        {/* Display Return of Investment Tables */}
        <DisplayRoiTable 
          /* Revenue Table Data */
          revenueData={revenueTableData}
          /* Expenses Table Data */
          expensesData={expensesTableData}
          /* Final Totals Display Table Data */
          // Revenue
          oneTimeRevenue={this.state.oneTimeRevenue}
          monthlyRevenue={this.state.monthlyRevenue}
          totalRevenue={totalRevenue}
          // Expenses
          oneTimeExpense={this.state.oneTimeExpense}
          monthlyExpense={this.state.monthlyExpense}
          totalExpense={totalExpense}
          // Profits
          monthlyProfit={monthlyContributionProfit}
          totalProfit={totalContributionProfit}
          // Profit Margin
          margin={contributionMargin}
          // Return of Investment
          roi={capitalROI} 
        />
      </div>
    );
  }
}

export default App;
