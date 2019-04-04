import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
import './App.css';

import Header from './components/Header';
import InputError from './components/InputError';
import RevenueTable from './components/RevenueTable';
import ExpenseTable from './components/ExpenseTable';
import TotalsTable from './components/TotalsTable';
import AddTableItem from './components/AddTableItem';

class App extends Component {
  constructor() {
    super();
    // "seed" data initially
    this.state = {
      revenue: [
        {
          name: "Item 1",
          oneTime: 100,
          monthly: 50
        },
        {
          name: "Item 2",
          oneTime: 50,
          monthly: 25
        },
        {
          name: "Item 3",
          oneTime: 25,
          monthly: 85
        }
      ],

      expenses: [
        {
          name: "Expense 1",
          oneTime: 500,
          monthly: 20.0
        },
        {
          name: "Expense 2",
          oneTime: 200,
          monthly: 40
        }
      ],

      oneTimeRevenue: 175,
      oneTimeExpense: 700,
      monthlyRevenue: 160,
      monthlyExpense: 60,
      newType: "",
      newName: "",
      newOneTime: "",
      newMonthly: "",
      error: false
    };
    let newType1 = "";

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    // controlled form elements functions
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this);
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this);
  }

  // Delete expense or revenue from list
  handleDelete(type, index) {
    // listType will be 'expenses' or 'revenue' depending on item to delete
    let listType = this.state[type];
    // recalculate and set totals in state
    if (type === "expenses") {
      this.setState({
        oneTimeExpense:
          this.state.oneTimeExpense - this.state.expenses[index]["oneTime"],
        monthlyExpense:
          this.state.monthlyExpense - this.state.expenses[index]["monthly"]
      });
    } else {
      // for revenue
      this.setState({
        oneTimeRevenue:
          this.state.oneTimeRevenue - this.state.revenue[index]["oneTime"],
        monthlyRevenue:
          this.state.monthlyRevenue - this.state.revenue[index]["monthly"]
      });
    }
    // remove list item from state array
    this.setState({
      [listType]: listType.splice(index, 1)
    });
  }

  // controlled form elements, watch for changes
  handleTypeChange(e) {
    this.setState({
      newType: e.target.value
    });
  }
  handleNameChange(e) {
    this.setState({
      newName: e.target.value
    });
  }

  handleMonthlyChange(e) {
    this.setState({
      newMonthly: Number(e.target.value)
    });
  }
  handleOneTimeChange(e) {
    this.setState({
      newOneTime: Number(e.target.value)
    });
  }

  // add new expense or revenue
  handleAdd(e) {
    e.preventDefault();
    // handle form errors, allows one-time and revenue amounts to be 0
    if (
      !this.state.newType ||
      !this.state.newName ||
      (!this.state.newOneTime && this.state.newOneTime !== 0) ||
      (!this.state.newMonthly && this.state.newMonthly !== 0)
    ) {
      this.setState({
        error: true
      });
    }
    // if there are no form errors, add accordingly
    else {
      // typeOfAmount will be either 'expenses' or 'revenue'
      let typeOfAmount = this.state.newType;
      let monthly =
        typeOfAmount === "expenses" ? "monthlyExpense" : "monthlyRevenue";
      let oneTime =
        typeOfAmount === "expenses" ? "oneTimeExpense" : "oneTimeRevenue";
      // grab state array of revenues or expenses
      let items = this.state[typeOfAmount];
      items.push({
        name: this.state.newName,
        oneTime: this.state.newOneTime,
        monthly: this.state.newMonthly
      });
      // set state with new totals and items array, clear errors displaying and form contents
      this.setState({
        error: false,
        [typeOfAmount]: items,
        [monthly]: this.state[monthly] + this.state.newMonthly,
        [oneTime]: this.state[oneTime] + this.state.newOneTime,
        //  Clear values in form
        newName: "",
        newMonthly: "",
        newOneTime: "",
        newType: ""
      });
    }
  }

  render() {
    // Calculations for totals
    let totalRevenue =
      this.state.oneTimeRevenue + this.state.monthlyRevenue * 12;
    let totalExpense =
      this.state.oneTimeExpense + this.state.monthlyExpense * 12;
    let monthlyContributionProfit =
      this.state.monthlyRevenue - this.state.monthlyExpense;
    let totalContributionProfit = totalRevenue - totalExpense;
    // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
    let contributionMargin =
      totalRevenue !== 0
        ? ((totalContributionProfit / totalRevenue) * 100).toFixed(0)
        : 0;
    // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
    let capitalROI =
      totalExpense === 0 && totalRevenue === 0
        ? 0
        : (
            (this.state.oneTimeExpense - this.state.oneTimeRevenue) /
            monthlyContributionProfit
          ).toFixed(1);

    return (
      <div>
        {/* Header component */}
        <Header />
        {/* Add new expense or revenue form */}
        {/* <AddTableItem
          newType1={this.newType}
          newType={this.state.newType}
          handleAdd={this.handleAdd}
          handleTypeChange={this.handleTypeChange}
          handleNameChange={this.state.handleNameChange}
          newName={this.state.newName}
          handleOneTimeChange={this.state.handleOneTimeChange}
          newOneTime={this.newOneTime}
          handleMonthlyChange={this.state.handleMonthlyChange}
          newMonthly={this.state.newMonthly}
        /> */}
        <Form className="addExpenseOrRevenueForm" onSubmit={this.handleAdd}>
          <Row className="input-field">
            <Col sm={{ span: 2, offset: 1}} className="input-field">
              <Form.Control
                as="select"
                onChange = {this.handleTypeChange}
                value={this.state.newType ? this.state.newType : 'choose'}
                >
                <option value="choose" disabled={true}>Select Type</option>
                <option value="revenue">Revenue</option>
                <option value="expenses">Expense</option>
              </Form.Control>
            </Col>
            <Col sm={3} className="input-field">
              <Form.Control
                type="text" 
                placeholder="Name"
                onChange = {this.handleNameChange}
                value={this.state.newName ? this.state.newName : ''}
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="One-Time Amount"
                onChange = {this.handleOneTimeChange}
                step="0.01"
                min="0"
                value={(this.state.newOneTime || this.state.newOneTime === 0) ? this.state.newOneTime : ''}
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="Monthly Amount"
                onChange = {this.handleMonthlyChange}
                step="0.01"
                min="0"
                value={(this.state.newMonthly || this.state.newMonthly === 0) ? this.state.newMonthly : ''}
              />
            </Col>
            <Col sm={1} className="add-form-button">
              <Button type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
        {/* Form Errors and Error Component*/}
        {this.state.error && <InputError />}
        <div className="roi-tables">
          {/* Revenue Table Component*/}
          <RevenueTable
            handleDelete={this.handleDelete}
            revenue={this.state.revenue}
          />
          {/* Expenses Table Component */}
          <ExpenseTable
            handleDelete={this.handleDelete}
            expense={this.state.expenses}
          />
          {/* Totals Table */}
          <TotalsTable
            oneTimeRevenue={this.state.oneTimeRevenue}
            monthlyRevenue={this.state.monthlyRevenue}
            oneTimeExpense={this.state.oneTimeExpense}
            monthlyExpense={this.state.monthlyExpense}
            totalRevenue={totalRevenue}
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
