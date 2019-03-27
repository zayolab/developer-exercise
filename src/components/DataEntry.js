import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    Form
   } from 'react-bootstrap';
import './Data.css';

class DataEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      newOneTime: '',
      newMonthly: '',
      error: false
    }
  }

  // controlled form elements, watch for changes
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

  handleAdd(e) {
    e.preventDefault()
    const { newName, newOneTime, newMonthly } = this.state;
    // handle form errors, allows one-time and revenue amounts to be 0
    if (!newName || (!newOneTime && newOneTime !== 0) || (!newMonthly && newMonthly !== 0)) {
      this.setState({
        error: true
      })
    }
    // if there are no form errors, add accordingly
    else {
      this.props.onAddData( newName, newOneTime, newMonthly );
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
    const { newName, newOneTime, newMonthly } = this.state;

    return (
      <div>
        {/* Add new expense or revenue form */}
        <Form className="addExpenseOrRevenueForm" onSubmit={(e) => this.handleAdd(e)}>
          <Row className="input-field">
            <Col sm={3} className="input-field">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange = {(e) => this.handleNameChange(e)}
                value={newName ? newName : ''}
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="One-Time Amount"
                onChange = {(e) => this.handleOneTimeChange(e)}
                step="0.01"
                min="0"
                value={(newOneTime || newOneTime === 0) ? newOneTime : ''}
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="Monthly Amount"
                onChange = {(e) => this.handleMonthlyChange(e)}
                step="0.01"
                min="0"
                value={(newMonthly || newMonthly === 0) ? newMonthly : ''}
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
        </div>
    );
  }
}

export default DataEntry;