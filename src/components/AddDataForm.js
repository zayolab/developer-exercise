import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'

const AddDataForm = props => {
  const initialFormState = { id: null, name: '', oneTime: 0, monthly: 0, type: 'default' }

  const [data, setData] = useState(initialFormState)

  const handleInputChange = event => {
    console.log('EVENT TARGET Name>>>', event.target.name);
    console.log('EVENT TARGET value>>>', event.target.value)
    const { name, value } = event.target
    setData({...data, [name]: value})
  }

  return (
      <div>
        <h2>Add Expense or Revenue</h2>
        <Form onSubmit={event => {
          event.preventDefault()
          console.log('Data is', data);
          if(data.type === 'revenue'){
          props.addRevenue(data)
          }
          else if (data.type === 'expense'){
            props.addExpense(data)
          }
          console.log('Inital Form State before reset is>>', initialFormState);
          setData(initialFormState)
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
        </Form>
      </div>
  )
}

export default AddDataForm
