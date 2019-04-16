import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    Form
   } from 'react-bootstrap';
   import PropTypes from 'prop-types';
  

export class AddTransaction extends Component {

  render() {
    return (
        <Form className="addExpenseOrRevenueForm" onSubmit={this.props.handleAdd}>
          <Row className="input-field">
            <Col sm={{ span: 2, offset: 1}} className="input-field">
              <Form.Control
                as="select"
                onChange = {this.props.handleTypeChange}
                value={this.props.transaction.newType ? this.props.transaction.newType : 'choose'}
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
                onChange = {this.props.handleNameChange}
                value={this.props.transaction.newName ? this.props.transaction.newName : ''}
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="One-Time Amount"
                onChange = {this.props.handleOneTimeChange}
                step="0.01"
                min="0"
                value={(this.props.transaction.newOneTime || this.props.transaction.newOneTime === 0) ? this.props.transaction.newOneTime : ''}
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="Monthly Amount"
                onChange = {this.props.handleMonthlyChange}
                step="0.01"
                min="0"
                value={(this.props.transaction.newMonthly || this.props.transaction.newMonthly === 0) ? this.props.transaction.newMonthly : ''}
              />
            </Col>
            <Col sm={1} className="add-form-button">
              <Button type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
    )
  }
}

export default AddTransaction

AddTransaction.propTypes = {
  transaction: PropTypes.object.isRequired,         // TBD: because transaction is an object, does this need to be improved?
  handleTypeChange: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleOneTimeChange: PropTypes.func.isRequired,
  handleMonthlyChange: PropTypes.func.isRequired
}
