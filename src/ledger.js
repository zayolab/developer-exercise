import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {capitalize} from "./helper.js";

/**
 * Class representing an account ledger with one-time and monthly revenue/expenses
 * Constructor arguments:
 * name: The name of the table
 * deleteCallback: The function to call when a ledger item is deleted
 */
export class ledger {
    constructor() {
        this.entries = [];
        this.oneTimeTotal = 0;
        this.monthlyTotal = 0;

        // bind class methods
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    // Delete expense or revenue from list
    deleteItem(index) {
        // recalculate and set totals
        this.oneTimeTotal -= this.entries[index]['oneTime'];
        this.monthlyTotal -= this.entries[index]['monthly'];

        // remove list item from entries
        this.entries.splice(index, 1);
    }

    /**
     * Add new expense or revenue
     * Form values are validated in App.js, so we don't need to check here.
     */
    addItem(formName, formOneTime, formMonthly) {
        // add new data to entries array
        this.entries.push({
            name: formName,
            oneTime: formOneTime,
            monthly: formMonthly
        });

        // update oneTime and monthly
        this.oneTimeTotal += formOneTime;
        this.monthlyTotal += formMonthly;
    }
}

/**
 * Component for a table representing the values in a ledger
 * Properties:
 * name: The name of the ledger. Must be the same as one of the ledgers in the app.
 * ledger: The ledger object which holds the investments/accounts
 * deleteCallback: The function to call when a row in the ledger is deleted
 */
export class LedgerTable extends Component {
    render() {
        let tableName = this.props.name;
        let ledger = this.props.ledger;
        let tableData = ledger.entries.map((item, index) => {
            return (
                    <tr key={tableName + index}>
                    <td>{item.name}</td>
                    <td>${item.oneTime.toFixed(2)}</td>
                    <td>${item.monthly.toFixed(2)}</td>
                    <td><Button onClick={() => this.props.deleteCallback(tableName, index)}>Delete</Button></td>
                    </tr>
            );
        });

        return (
                <table className={tableName + "-table"}>
                <thead>
                <tr>
                {/* Capitalize first letter of table title */}
                <th>{capitalize(tableName)}</th>
                </tr>
                <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th></th>
                </tr>
                </thead>
                <tbody>
                {/* Fill the rows with ledger data */}
                {tableData}
                </tbody>
                </table>
        )
    }
}
