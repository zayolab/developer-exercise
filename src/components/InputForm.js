import React from 'react'
import { Container, Form, Row, Col, Button } from 'reactstrap'

const InputForm = props => {



return (
/* Add new expense or revenue form */
<Container>
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
    /* form errors */
    <div>
    { this.state.error &&
    <h4 className="error text-center">Please fill out all fields</h4>
    }
    </div>
  </Form>
  </Container>
  )
}

export default InputForm
