import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'

const EditRevenueForm = props => {

  useEffect(() => {
    setRevenue(props.currentRevenue)
  }, [props])

  const [revenue, setRevenue] = useState(props.currentRevenue)

  const handleInputChange = event => {
    const { name, value } = event.target
    if(name === 'oneTime' || name === 'monthly'){
      setRevenue({...revenue, [name]: parseInt(value)})
    }
    setRevenue({ ...revenue, [name]: value })
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
          props.updateRevenue(revenue.id, revenue)
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
      </Form>
    </div>
  )
}

export default EditRevenueForm
