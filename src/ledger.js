import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
export class ledger {
    constructor() {
        this.entries = [
            {
                name: "test",
                oneTime: 40,
                monthly: 50
            }
        ];
        this.oneTimeTotal = 40;
        this.monthlyTotal = 50;
        // this.oneTime = 0;
        // this.monthly = 0;

        // bind class methods
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    // Delete expense or revenue from list
    deleteItem(index) {
        console.log("Deleting item");
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
        console.log("Adding item " + formName + " " + formOneTime + " " + formMonthly);
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
                <th>{tableName.charAt(0).toUpperCase() + tableName.slice(1)}</th>
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
