import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
 import AlertMessage from './AlertMessage'

const EditDataForm = props => {

/*************** Functional Component State ****************/

  const [data, setData] = useState(props.currentData)
  const [numberError, setNumberError] = useState(false)
  const [nameError, setNameError] = useState(false)
  console.log('Edit form Data Type', data);
  const dataType = data.type

/********************* Listen for Prop Changes *************/
  useEffect(() => {
    setData(props.currentData)
  }, [props])

/********************** Event Handling ************************/

  const handleInputChange = event => {
    console.log('EVENT TARGET Name>>>', event.target.name);
    console.log('EVENT TARGET value>>>', event.target.value)
    const { name, value } = event.target
    if(name === 'oneTime' || name === 'monthly'){
      setData({...data, [name]: parseInt(value)})
    }
    else {
      setData({ ...data, [name]: value })
    }
  }

  const handleDelete = () => {
    props.deleteData(data.id, dataType)
    props.setEditingData(false)
  }

/********************* Component Return *************************/

  return (
    <div>
      <h2>Edit {dataType} Entry</h2>
      <Form
        onSubmit={event => {
          event.preventDefault()
          console.log('Updated Revenue Item>>>', data);

    /********* Error Handling Before Submission *********/
          if(!data.oneTime && data.oneTime !== 0){
            setNumberError(true)
          }
          else if (!data.monthly && data.monthly !== 0){
            setNumberError(true)
          }
          else if (data.name === ""){
            setNameError(true)
          }
          else {
            props.updateData(data.id, data)
          }
        }}
      >
      {/***************** Form Fields ******************/}
        <Row className="input-field">
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
          <Col sm={2} className="add-form-button">
            <Button type="submit">Update {dataType}</Button>
          </Col>
          <Col sm={2} className="add-form-button">
            <Button variant="warning" onClick={() => props.setEditingData(false)} className="button muted-button">
              Cancel
            </Button>
          </Col>
          <Col sm={2} className="add-form-button">
            <Button variant="danger" onClick={() => handleDelete()} className="button muted-button">
              Delete {dataType} Entry
            </Button>
          </Col>
        </Row>

    {/********** Error Handling Alerts *************/}

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

export default EditDataForm
