import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    Form
} from 'react-bootstrap';
import {ledger, LedgerTable} from "./ledger.js";
import TotalsTable from "./totals.js";
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            term: 12, // reflect a 1 year term by default
            newLedgerType: '',
            newLedgerName: '',
            selectedLedgerIndex: undefined,
            newName: '',
            newOneTime: '',
            newMonthly: '',
            ledgerError: false,
            entryError: false,
            termError: false
        }
        this.ledgers = {
            revenue: [
                new ledger("Revenue", "revenue")
            ],
            expenses: [
                new ledger("Expenses", "expenses")
            ]
        };

        // helper functions
        this.ledgerAt = this.ledgerAt.bind(this);

        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleDeleteLedger = this.handleDeleteLedger.bind(this);
        this.handleAddLedger = this.handleAddLedger.bind(this);

        // controlled ledger form elements
        this.handleLedgerNameChange = this.handleLedgerNameChange.bind(this);
        this.handleLedgerTypeChange = this.handleLedgerTypeChange.bind(this);

        // controlled form elements functions
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLedgerChange = this.handleLedgerChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleOneTimeChange = this.handleOneTimeChange.bind(this);
        this.handleMonthlyChange = this.handleMonthlyChange.bind(this);
    }

    /**
     * Return the ledger group (revenue or expenses) and index within said group at the given total index
     * I always concat revenues first, expenses after, so an index < this.ledgers.revenue.length is a revenue ledger, otherwise it is an expenses ledger
     * Returns:
     * {
     *     ledgerGroup: this.ledgers.revenues or this.ledgers.expenses
     *     index: The index *within the group* of the selected ledger
     * }
     */
    ledgerAt(index) {
        // check input errors
        if(index < 0) throw new TypeError("Index must be >= 0");
        if(isNaN(index)) throw new TypeError("Index must be a number");

        //Find ledger type.
        //Since I concat revenue:expenses in generating indices, (index<revenue.length) belongs to revenue, otherwise expenses
        if(index < this.ledgers.revenue.length) {
            return {ledgerGroup: this.ledgers.revenue, index: index};
        }
        return {ledgerGroup: this.ledgers.expenses, index: index - this.ledgers.revenue.length};
    }

    // controlled ledger form elements, watch for changes
    handleLedgerNameChange(e) {
        if(!e.target.value) {
            this.setState({
                newLedgerError: true
            });
            return false;
        }
        this.setState({
            newLedgerName: e.target.value
        });
    }
    handleLedgerTypeChange(e) {
        this.setState({
            newLedgerType: e.target.value
        });
    }

    // controlled entry form elements, watch for changes
    handleTermChange(e) {
        if(!e.target.value || //check for empty string
           isNaN(e.target.value) || //check for non-numeric string
           e.target.value.indexOf(' ') >= 0) { //check for whitespace in string
            this.setState({
                termError: true
            });
            return false;
        }
        this.setState({
            term: e.target.value,
            termError: false
        });
    }
    handleLedgerChange(e) {
        this.setState({
            selectedLedgerIndex: e.target.value
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

    /** Delete expense or revenue from list
     * Item deletion has no validation, so I could just use deleteItem in ledger
     * I chose to leave this function in case a future developer needs to add additional application-specific behavior
     * Arguments:
     * ledger: the ledger object that owns the line item
     * index: The index of the item to delete in the list
     */
    handleDeleteItem(ledger, index) {
        ledger.deleteItem(index);
        this.forceUpdate(); //Since we don't set any state for this, the page doesn't otherwise refresh after deletion
    }

    // add new expense or revenue item
    handleAddItem(e) {
        e.preventDefault();
        // handle form errors, allows one-time and revenue amounts to be 0
        if ((!this.state.selectedLedgerIndex && this.state.selectedLedgerIndex !== 0) ||
            !this.state.newName ||
            (!this.state.newOneTime && this.state.newOneTime !== 0) ||
            (!this.state.newMonthly && this.state.newMonthly !== 0)) {
            this.setState({
                entryError: true
            });
        }
        // if there are no form errors, add accordingly
        else {
            // grab state revenues or expenses ledger.
            let ledgerInfo = this.ledgerAt(this.state.selectedLedgerIndex);
            let ledger = ledgerInfo.ledgerGroup[ledgerInfo.index];
            ledger.addItem(this.state.newName, this.state.newOneTime, this.state.newMonthly);

            // set state with new totals and items array, clear errors displaying and form contents
            // I no longer clear the 'account' (formerly 'type') field so that multiple entries can be added quickly
            this.setState({
                entryError: false,
                //  Clear values in form
                newName: '',
                newMonthly: '',
                newOneTime: '',
            });
        }
    }

    // delete a ledger/account
    handleDeleteLedger(index) {
        let ledgerInfo = this.ledgerAt(index);
        ledgerInfo.ledgerGroup.splice(ledgerInfo.index, 1);

        //Clear the ledger select field to ensure that the user does not try to act on a nonexistant/incorrect ledger
        this.setState({
            selectedLedgerIndex: undefined
        });
        this.forceUpdate();
    }

    // add a new ledger/account of type revenue or expense
    handleAddLedger(e) {
        e.preventDefault();
        if(!this.state.newLedgerType || !this.state.newLedgerName) {
            this.setState({
                ledgerError: true
            });
        } else {
            // Add the new ledger to the correct ledger group. newLedgerType will be "revenue" or "expenses"
            let ledgerGroup = (this.state.newLedgerType === "revenue" ? this.ledgers.revenue : this.ledgers.expenses);
            ledgerGroup.push(new ledger(this.state.newLedgerName, this.state.newLedgerType));

            // clear error flags and reset form values
            this.setState({
                ledgerError: false,
                newLedgerType: '',
                newLedgerName: '',
                // if an expense ledger is selected and a revenue ledger is added, the selected index will point at the incorrect ledger
                selectedLedgerIndex: undefined
            });
        }
    }

    render() {
        // concatenate revenue and expenses ledger lists
        let ledgers = this.ledgers.revenue.concat(this.ledgers.expenses);

        // get a list of all ledgers and print a header indicating the revenue/expenses groups
        let header = '';
        let ledgerOptions = ledgers.map((ledger, index) => {
            // Before the first (merged) list item, print the revenue ledger indicator
            if(!index) header = <option value="revenue-header" disabled={true}>---- Revenue Ledgers ----</option>;
            // Before the first expense item, print the expense ledger indicator
            else if(index == this.ledgers.revenue.length) header = <option value="expenses-header" disabled={true}>---- Expense Ledgers ----</option>;
            else header = '';
            console.log("Adding header " + header);
            return (
                <>
                    {header}
                    <option value={index}>{ledger.name}</option>
                </>
            );
        });

        // create components for all revenue and expense tables
        let revenueTables = this.ledgers.revenue.map((ledger, index) => {
            return (
                    <LedgerTable index={index} ledger={ledger} deleteItemCallback={this.handleDeleteItem} deleteLedgerCallback={this.handleDeleteLedger}/>
            );
        });
        let expenseTables = this.ledgers.expenses.map((ledger, index) => {
            return (
                    <LedgerTable index={this.ledgers.revenue.length + index} ledger={ledger} deleteItemCallback={this.handleDeleteItem} deleteLedgerCallback={this.handleDeleteLedger}/>
            );
        });

        return (
    <div>
        <h1 className="text-center">ROI Calculator</h1>
        {/* Investment term form */}
        <Row className="input-field">
            <Col sm={{ span: 2, offset: 1}} className="input-field">
            <p className="font-weight-bold">Investment Term:</p>
                    </Col>
                    <Col className="input-field">
                    <input type="number" placeholder={this.state.term} name="investmentTerm" list="terms" onChange={this.handleTermChange}/>
                    <datalist id="terms">
                        <option value="12">12 Months</option>
                        <option value="24">24 Months</option>
                        <option value="36">36 Months</option>
                        <option value="48">48 Months</option>
                        <option value="60">60 Months</option>
                    </datalist>
            </Col>
            <Col>
            { this.state.termError &&
                <h4 className="error text-center">Investment term must be a number</h4>
            }
            </Col>
        </Row>
        {/* Add new ledger form */}
            <h3 className="text-center">Add New Ledger</h3>
                <Form className="addLedgerForm" onSubmit={this.handleAddLedger}>
                <Row className="input-field">
                <Col sm={{ span: 2, offset: 1 }} className="input-field">
                <Form.Control
            as="select"
            type="string"
            onChange = {this.handleLedgerTypeChange}
            value={this.state.newLedgerType ? this.state.newLedgerType : 'choose'}>
                <option value="choose" disabled={true}>Select Ledger Type</option>
                <option value="revenue">Revenue</option>
                <option value="expenses">Expenses</option>
            </Form.Control>
                </Col>
                <Col sm={7} className="input-field">
                <Form.Control
            type="text"
            placeholder="Ledger Name"
            onChange = {this.handleLedgerNameChange}
            value={this.state.newLedgerName ? this.state.newLedgerName : ''}
            />
                </Col>
                <Col sm={1} className="add-form-button">
                    <Button type="submit">
                    Add Ledger
                    </Button>
                </Col>
                </Row>
                </Form>
                {/* Ledger form errors */}
            {this.state.ledgerError &&
             <h4 className="error text-center">Please fill out all fields.</h4>
            }
        {/* Add new expense or revenue form */}
            <h3 className="text-center">Add New Line Item</h3>
        <Form className="addExpenseOrRevenueForm" onSubmit={this.handleAddItem}>
            <Row className="input-field">
                <Col sm={{ span: 2, offset: 1}} className="input-field">
                <Form.Control
                    as="select"
                    type="number"
                    onChange = {this.handleLedgerChange}
            value={this.state.selectedLedgerIndex !== undefined ? this.state.selectedLedgerIndex : 'choose'}
                >
                    <option value="choose" disabled={true}>Select Ledger</option>
                    {ledgerOptions}
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
                <Button sm={1} type="submit">
                Add Item
            </Button>
            </Col>
            </Row>
        </Form>
        {/* Item form errors */}
            { this.state.entryError &&
            <h4 className="error text-center">Please fill out all fields</h4>
        }
        <div className="roi-tables">
            {/* Revenue Table */}
            <h3 className="text-center">Revenue Accounts</h3>
            {this.ledgers.revenue.length ? revenueTables :
             <p className="empty-table-message">There are currently no Revenue accounts. Add one above to start tracking revenue.</p>}
            {/* Expenses Table */}
            <h3 className="text-center">Expense Accounts</h3>
            {this.ledgers.expenses.length ? expenseTables :
             <p className="empty-table-message">There are currently no Expense accounts. Add one above to start tracking expenses.</p>}
            {/* Totals Table */}
            <h3 className="text-center">Totals</h3>
            <TotalsTable revenueLedgers={this.ledgers.revenue} expenseLedgers={this.ledgers.expenses} term={this.state.term} />
        </div>
    </div>
        );
    }
}

export default App;
