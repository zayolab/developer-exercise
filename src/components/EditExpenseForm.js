import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'

const EditExpenseForm = props => {

  useEffect(() => {
    setExpense(props.currentExpense)
  }, [props])

  const [expense, setExpense] = useState(props.currentExpense)

  const handleInputChange = event => {
    const { name, value } = event.target
    if(name === 'oneTime' || name === 'monthly'){
      setExpense({...expense, [name]: parseInt(value)})
    }
    setExpense({ ...expense, [name]: value })
  }

  return (
    <div>
      <h2>Edit Expense</h2>
      <Form
        onSubmit={event => {
          event.preventDefault()
          props.updateExpense(expense.id, expense)
        }}
      >
        <Row className="input-field">
          <Col sm={3} className="input-field">
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={expense.name}
              onChange={handleInputChange}
            />
          </Col>
          <Col sm={2} className="input-field">
            <Form.Control
              name="oneTime"
              placeholder="One-Time Amount"
              step="0.01"
              min="0"
              value={expense.oneTime}
              onChange={handleInputChange}
            />
          </Col>
          <Col sm={2} className="input-field">
            <Form.Control
              name="monthly"
              placeholder="Monthly Amount"
              step="0.01"
              min="0"
              value={expense.monthly}
              onChange={handleInputChange}
            />
          </Col>
          <Col sm={2} className="add-form-button">
            <Button type="submit">Update Expense</Button>
          </Col>
          <Col sm={2} className="add-form-button">
            <Button variant="warning" onClick={() => props.setEditingExpense(false)} className="button muted-button">
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default EditExpenseForm
