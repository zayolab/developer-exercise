import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
 import AlertMessage from './AlertMessage'

const EditExpenseForm = props => {

//Use Effect is watching the expense prop and updating on change
  useEffect(() => {
    setExpense(props.currentExpense)
  }, [props])
//Functional Component State
  const [expense, setExpense] = useState(props.currentExpense)
  const [numberError, setNumberError] = useState(false)
  const [nameError, setNameError] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    if(name === 'oneTime' || name === 'monthly'){
      setExpense({...expense, [name]: parseInt(value)})
    }
    else {
      setExpense({ ...expense, [name]: value })
    }
  }

  return (
    <div>
      <h2>Edit Expense</h2>
      <Form
        onSubmit={event => {
          event.preventDefault()
/************ Error Handling Before Submission *************/
            if(!expense.oneTime && expense.oneTime !== 0 || !expense.monthly && expense.monthly !== 0){
              setNumberError(true)
            }
            else if (expense.name === ""){
              setNameError(true)
            }
            else {
              props.updateExpense(expense.id, expense)

            }
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
            type="number"
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
              type="number"
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
  {/******************Error Handling Alerts**********************/}
        {numberError &&
          <AlertMessage
            variant="danger"
            title="Woops! Something didn't go right!"
            message="Make sure to enter a one-time or monthly amount! If you don't have one, enter $0"
            setState={setNumberError}/>
        }
        {nameError &&
          <AlertMessage
            variant="danger"
            title="Woops! Something didn't go right!"
            message="Make sure to add a name to your entry!"
            setState={setNameError}/>
        }
      </Form>
    </div>
  )
}

export default EditExpenseForm
