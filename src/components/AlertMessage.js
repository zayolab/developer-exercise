import React from 'react'
import {
  Button,
  Alert,
  Row
 } from 'react-bootstrap'

const AlertMessage = props => {
  return (
    <Alert variant={props.variant}>
      <Row className='justify-content-md-center'>
        <p text-align="center">
          {props.message}
        </p>
        <hr />
      </Row>
        <Button variant="secondary" onClick={(() => props.setState(false))}>Close Alert</Button>
    </Alert>
  )
}

export default AlertMessage
