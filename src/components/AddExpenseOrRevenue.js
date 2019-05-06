// Kevin Valenzuela
import {
    Row,
    Col,
    Button,
    Form
  } from 'react-bootstrap'
import React from 'react'
{/* Add new expense or revenue form orginally 162 - 210 on App.js*/ }

function AddExpenseOrRevenue(props) {
    return (
      <div>
        <Form className="addExpenseOrRevenueForm" onSubmit={props.handleAdd}>
            <Row className="input-field">
              <Col sm={{ span: 2, offset: 1}} className="input-field">
                <Form.Control
                  as="select"
                  onChange = {props.handleTypeChange}
                  value={props.newType ? props.newType : 'choose'}
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
                  onChange = {props.handleNameChange}
                  value={props.newName ? props.newName : ''}
                />
              </Col>

              <Col sm={2} className="input-field">
                <Form.Control
                  type="number"
                  placeholder="One-Time Amount"
                  onChange = {props.handleOneTimeChange}
                  step="0.01"
                  min="0"
                  value={(props.newOneTime || props.newOneTime === 0) ? props.newOneTime : ''}
                />
              </Col>

              <Col sm={2} className="input-field">
                <Form.Control
                  type="number"
                  placeholder="Monthly Amount"
                  onChange = {props.handleMonthlyChange}
                  step="0.01"
                  min="0"
                  value={(props.newMonthly || props.newMonthly === 0) ? props.newMonthly : ''}
                />
              </Col>
              
              <Col sm={1} className="add-form-button">
                <Button type="submit">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
      </div>
    );
  }
export default AddExpenseOrRevenue;

