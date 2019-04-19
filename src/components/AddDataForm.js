import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  Form,
  Alert
 } from 'react-bootstrap'
 import AlertMessage from './AlertMessage'

const AddDataForm = props => {

//Functional componenet state
  const initialFormState = { id: null, name: '', oneTime: 0, monthly: 0, type: 'default' }
  const [data, setData] = useState(initialFormState)
  const [numberError, setNumberError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [success, setSuccess] = useState(false)

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
//Function remove success alert after 3 seconds
  const handleSuccess = () => setTimeout(function () {
        setSuccess(false);
    }, 3000)

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

    /******* Revenue or Expense Callback based on Type ******/
          props.addData(data)
            console.log('Inital Form State before reset is>>', initialFormState);
    /**** Set the form back to the inital state for next entry ****/
            setSuccess(true)
            handleSuccess()
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
                  <option value="Revenue" name="revenue">Revenue</option>
                  <option value="Expense" name="expense">Expense</option>
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
          {success &&
            <AlertMessage
              variant="success"
              title="Success!"
              message="Your entry was successfully added!"
              setState={setSuccess}
              />
          }
          {numberError &&
            <AlertMessage
              variant="danger"
              title="Woops! Something didn't go right!"
              message="Make sure to enter a one-time or monthly amount! If you don't have one, enter $0"
              setState={setNumberError}/>
          }

          {typeError &&
            <AlertMessage
              variant="danger"
              title="Woops! Something didn't go right!"
              message="Make sure to select if your entry is a Revenue or an Expense!"
              setState={setTypeError}/>
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

export default AddDataForm
