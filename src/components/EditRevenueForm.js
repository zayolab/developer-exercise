import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
 import AlertMessage from './AlertMessage'

const EditRevenueForm = props => {

  useEffect(() => {
    setRevenue(props.currentRevenue)
  }, [props])

//Functional Component State
  const [revenue, setRevenue] = useState(props.currentRevenue)
  const [numberError, setNumberError] = useState(false)
  const [nameError, setNameError] = useState(false)

  const handleInputChange = event => {
    console.log('EVENT TARGET Name>>>', event.target.name);
    console.log('EVENT TARGET value>>>', event.target.value)
    const { name, value } = event.target
    if(name === 'oneTime' || name === 'monthly'){
      setRevenue({...revenue, [name]: parseInt(value)})
    }
    else {
      setRevenue({ ...revenue, [name]: value })
    }
  }
  const handleDelete = () => {
    props.deleteRevenue(revenue.id)
    props.setEditingRevenue(false)
  }

  return (
    <div>
      <h2>Edit Revenue</h2>
      <Form
        onSubmit={event => {
          event.preventDefault()
          console.log('Updated Revenue Item>>>', revenue);
/************ Error Handling Before Submission *************/
          if(!revenue.oneTime && revenue.oneTime !== 0 || !revenue.monthly && revenue.monthly !== 0){
            setNumberError(true)
          }
          else if (revenue.name === ""){
            setNameError(true)
          }
          else {
            props.updateRevenue(revenue.id, revenue)
          }
        }}
      >
        <Row className="input-field">
          <Col sm={3} className="input-field">
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={revenue.name}
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
              value={revenue.oneTime}
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
              value={revenue.monthly}
              onChange={handleInputChange}
            />
          </Col>
          <Col sm={2} className="add-form-button">
            <Button type="submit">Update Revenue</Button>
          </Col>
          <Col sm={2} className="add-form-button">
            <Button variant="warning" onClick={() => props.setEditingRevenue(false)} className="button muted-button">
              Cancel
            </Button>
          </Col>
          <Col sm={2} className="add-form-button">
            <Button variant="danger" onClick={() => handleDelete()} className="button muted-button">
              Delete Revenue Entry
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

export default EditRevenueForm
