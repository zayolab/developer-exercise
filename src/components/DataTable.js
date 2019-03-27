import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import DataEntry from './DataEntry.js';
import './Data.css';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  // Delete expense or revenue from list
  handleDelete(index) {
    const { data, onUpdateTableData } = this.props;
    data.splice(index, 1);
    onUpdateTableData(data);
  }

  // add new expense or revenue
  handleAdd(newName, newOneTime, newMonthly) {
    const { data, onUpdateTableData } = this.props;
    data.push({
      name: newName,
      oneTime: newOneTime,
      monthly: newMonthly
    })
    onUpdateTableData(data);
  }

  render() {
    const { title, data } = this.props;

    // create table rows from revenue state list
    let tableData = data.map((item, index) => {
      return (
        <tr key={title + index}>
          <td>{item.name}</td>
          <td>${item.oneTime.toFixed(2)}</td>
          <td>${item.monthly.toFixed(2)}</td>
          <td><Button onClick={() => this.handleDelete(index)}>Delete</Button></td>
        </tr>
      )
    })

    return (
      <div>
        <div className="roi-tables">
          {/* Revenue Table */}
          <table className="revenue-table">
            <thead>
              <tr>
                <th>{title}</th>
              </tr>
              <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData}
            </tbody>
          </table>
          <DataEntry
            onAddData={(newName, newOneTime, newMonthly) => this.handleAdd(newName, newOneTime, newMonthly)}
          />
        </div>
      </div>
    );
  }
}

export default DataTable;