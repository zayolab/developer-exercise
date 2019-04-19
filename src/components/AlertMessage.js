import React from 'react'
import {
  Button,
  Alert,
 } from 'react-bootstrap'

const AlertMessage = props => {
  return (
    <Alert variant={props.variant}>
      <p className="mb-0">
        {props.message}
      </p>
      <hr />
      <Button variant="secondary" onClick={(() => props.setState(false))}>Close Alert</Button>
    </Alert>
  )
}

export default AlertMessage
