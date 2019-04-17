import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'

export const AddDataForm = props => {
const initialFormState = { id: null, name: '', username: '' }
const [user, setUser] = useState(initialFormState)

  return (
      <Form>
        <Row className="input-field">
          <Col sm={{ span: 2, offset: 1}} className="input-field">
            <Form.Control as="select">
              <option>Revenue</option>
              <option>Expense</option>
            </Form.Control>
          </Col>
          <Col sm={3} className="input-field">
            <Form.Control
              type="text"
              placeholder="Name"
              value=''
            />
          </Col>
          <Col sm={2} className="input-field">
            <Form.Control
              type="number"
              placeholder="One-Time Amount"
              step="0.01"
              min="0"
              value=''
            />
          </Col>
          <Col sm={2} className="input-field">
            <Form.Control
              type="number"
              placeholder="Monthly Amount"
              step="0.01"
              min="0"
              value=''
            />
          </Col>
          <Col sm={1} className="add-form-button">
            <Button type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
  )
}

export default AddDataForm
