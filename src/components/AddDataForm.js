import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  Form,
 } from 'react-bootstrap'
 import AlertMessage from './AlertMessage'

const AddDataForm = props => {

/************ Functional component state *************************/

  const initialFormState = { id: null, name: '', oneTime: "", monthly: "", type: 'default' }
  const [data, setData] = useState(initialFormState)
  const [numberError, setNumberError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [success, setSuccess] = useState(false)

/********************* Event Handling *****************************/

  const handleInputChange = event => {
    const { name, value } = event.target
    setData({...data, [name]: value})
  }

  //Function remove success alert after 3 seconds
  const handleSuccess = () => setTimeout(function () {
        setSuccess(false);
    }, 3000)
/********************* Component Return ***************************/

  return (
      <div>
        <h2>Add Expense or Revenue</h2>
        <Form onSubmit={event => {
          event.preventDefault()
      /***** Clear existing errors before checking *****/
          setNumberError(false)
          setTypeError(false)
          setNameError(false)
      /******** Error Handling Before Submission *****/
          if(!data.oneTime && data.oneTime !== 0){
            setNumberError(true)
          }
          else if (!data.monthly && data.monthly !== 0){
            setNumberError(true)
          }
          else if (data.type === 'default'){
            setTypeError(true)
          }
          else if (data.name === ""){
            setNameError(true)
          }
      /********** Add the data if no errors *********/
          else {
            props.addData(data)
      /********* Form back to the inital state *******/
            setSuccess(true)
            handleSuccess()
            setData(initialFormState)
          }
        }}>
    {/************** Form Input Fields *****************/}
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
              message="Your entry was successfully added!"
              setState={setSuccess}
              />
          }
          {numberError &&
            <AlertMessage
              variant="danger"
              message="Make sure to enter a one-time or monthly amount. If you don't have one, enter 0"
              setState={setNumberError}/>
          }

          {typeError &&
            <AlertMessage
              variant="danger"
              message="Make sure to select if your entry is a Revenue or an Expense."
              setState={setTypeError}/>
          }
          {nameError &&
            <AlertMessage
              variant="danger"
              message="Make sure to add a name to your entry."
              setState={setNameError}/>
          }
        </Form>
      </div>
  )
}

export default AddDataForm
