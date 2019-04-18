import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  Form,
  Alert
 } from 'react-bootstrap'
 import AlertError from './AlertError'

const AddDataForm = props => {

  //Functional componenet state
  const initialFormState = { id: null, name: '', oneTime: 0, monthly: 0, type: 'default' }
  const [data, setData] = useState(initialFormState)
  const [numberError, setNumberError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [nameError, setNameError] = useState(false)

  const handleInputChange = event => {
    console.log('EVENT TARGET Name>>>', event.target.name);
    console.log('EVENT TARGET value>>>', event.target.value)
    const { name, value } = event.target
    //oneTime and monthly amounts from string to number
    if(name === 'oneTime' || name === 'monthly'){
      setData({...data, [name]: parseInt(value)})
    }
    else{
    setData({...data, [name]: value})
    }
  }

  return (
      <div>
        <h2>Add Expense or Revenue</h2>
        <Form onSubmit={event => {
          event.preventDefault()
          console.log('Data is', data);
    /************ Error Handling Before Submission *************/
          if(!data.oneTime && data.oneTime !== 0 || !data.monthly && data.monthly !== 0){
            setNumberError(true)
          }
          else if (data.type === 'default'){
            setTypeError(true)
          }
          else if (data.name === ""){
            setNameError(true)
          }
    /******* Revenue or Expense Callback based on Type ******/
          else {
            if(data.type === 'revenue'){
            props.addRevenue(data)
            }
            else if (data.type === 'expense'){
              props.addExpense(data)
            }
            console.log('Inital Form State before reset is>>', initialFormState);
    /**** Set the form back to the inital state for next entry ****/
            setData(initialFormState)
            setNumberError(false)
            setTypeError(false)
            setNameError(false)
          }
        }}>
          <Row className="input-field">
            <Col sm={{ span: 2, offset: 1}} className="input-field">
              <Form.Control as="select" name="type" value={data.type} onChange={handleInputChange}>
                  <option value="default" name="default" disabled={false}>Select Type</option>
                  <option value="revenue" name="revenue">Revenue</option>
                  <option value="expense" name="expense">Expense</option>
              </Form.Control>
            </Col>
            <Col sm={3} className="input-field">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={data.name}
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
                value={data.oneTime}
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
                value={data.monthly}
                onChange={handleInputChange}
              />
            </Col>
            <Col sm={1} className="add-form-button">
              <Button type="submit">
                Add
              </Button>
            </Col>
          </Row>
  {/******************Error Handling Alerts**********************/}
          {numberError &&
            <AlertError
              errorMessage="Make sure to enter a one-time or monthly amount! If you don't have one, enter $0"
              setError={setNumberError}/>
          }

          {typeError &&
            <AlertError
              errorMessage="Make sure to select if your entry is a Revenue or an Expense!"
              setError={setTypeError}/>
          }
          {nameError &&
            <AlertError
              errorMessage="Make sure to add a name to your entry!"
              setError={setNameError}/>
          }
        </Form>
      </div>
  )
}

export default AddDataForm
