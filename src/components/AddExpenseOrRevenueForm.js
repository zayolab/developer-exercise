import React from 'react'
import {
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap'

function AddExpenseOrRevenueForm(props) {
  return (
    <div>
      <Form className="addExpenseOrRevenueForm" onSubmit={e => props.handleAdd(e)}>
          <Row className="input-field">
            <Col sm={{ span: 2, offset: 1}} className="input-field">
              <Form.Control
                required
                as="select"
                onChange = {e => props.handleTypeChange(e)}
                value={props.newType ? props.newType : 'choose'}
                >
                <option value="choose" disabled={true}>Select Type</option>
                <option value="revenue">Revenue</option>
                <option value="expenses">Expense</option>
              </Form.Control>
            </Col>
            <Col sm={3} className="input-field">
              <Form.Control
                required
                type="text"
                placeholder="Name"
                onChange = {e => props.handleNameChange(e)}
                value={props.newName ? props.newName : ''}
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                required
                type="number"
                placeholder="One-Time Amount"
                onChange = {e => props.handleOneTimeChange(e)}
                step="0.01"
                min="0"
                value={(props.newOneTime || props.newOneTime === 0) ? props.newOneTime : ''}
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                required
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

export default AddExpenseOrRevenueForm;
