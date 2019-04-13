import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    Form
} from 'react-bootstrap'
import ledger from "./ledger.js";
import './App.css';

class App extends Component {
    constructor() {
        super()
        // "seed" data initially
        this.state = {
            revenue: new ledger(),
            expenses: new ledger(),
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

    // Delete expense or revenue from list
    handleDelete(type, index) {
        // listType will be 'expenses' or 'revenue' depending on item to delete
        let ledger = this.state[type];
        ledger.deleteItem(type, index);
        this.forceUpdate(); //otherwise the page doesn't refresh after deletion
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
            // grab state revenues or expenses ledger
            let ledger = this.state[this.state.newType]
            ledger.addItem(this.state.newName, this.state.newOneTime, this.state.newMonthly);
            // set state with new totals and items array, clear errors displaying and form contents
            this.setState({
                error: false,
                //  Clear values in form
                newName: '',
                newMonthly: '',
                newOneTime: '',
                newType: ''
            })
        }
    }

    render() {
        // create table rows from revenue state list
        let revenueTableData = this.state.revenue.entries.map((item, index) => {
            return (
                    <tr key={"revenue" + index}>
                    <td>{item.name}</td>
                    <td>${item.oneTime.toFixed(2)}</td>
                    <td>${item.monthly.toFixed(2)}</td>
                    <td><Button onClick={() => this.handleDelete('revenue', index)}>Delete</Button></td>
                    </tr>
            )
        })
        // create table rows from expenses state list
        let expensesTableData = this.state.expenses.entries.map((expense, index) => {
            return (
                    <tr key={"expense" + index}>
                    <td>{expense.name}</td>
                    <td>${expense.oneTime.toFixed(2)}</td>
                    <td>${expense.monthly.toFixed(2)}</td>
                    <td><Button onClick={() => this.handleDelete('expenses', index)}>Delete</Button></td>
                    </tr>
            )
        })

        // Calculations for totals
        let totalRevenue = this.state.revenue.oneTimeTotal + (this.state.revenue.monthlyTotal * 12)
        let totalExpense = this.state.expenses.oneTimeTotal + (this.state.expenses.monthlyTotal * 12)
        let monthlyContributionProfit = this.state.revenue.monthlyTotal - this.state.expenses.monthlyTotal
        let totalContributionProfit = totalRevenue - totalExpense
        // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
        let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0
        // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
        let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.state.expenses.oneTimeTotal - this.state.revenue.oneTimeTotal) / monthlyContributionProfit).toFixed(1)

        return (
                <div>
                <h1 className="text-center">ROI Calculator</h1>
                {/* Add new expense or revenue form */}
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
                {revenueTableData}
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
                {expensesTableData}
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
                <td>${(this.state.revenue.oneTimeTotal).toFixed(2)}</td>
                <td>${(this.state.revenue.monthlyTotal).toFixed(2)}</td>
                <td>${totalRevenue.toFixed(2)}</td>
                </tr>
                <tr>
                <td>Expenses</td>
                <td>${(this.state.expenses.oneTimeTotal).toFixed(2)}</td>
                <td>${(this.state.expenses.monthlyTotal).toFixed(2)}</td>
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
