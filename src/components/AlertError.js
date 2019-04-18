import React from 'react'
import {
  Button,
  Alert,
 } from 'react-bootstrap'

const AlertError = props => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Woops! Something didn't go right!</Alert.Heading>
      <hr />
      <p className="mb-0">
        {props.errorMessage}
      </p>
      <hr />
      <Button onClick={(() => props.setError(false))}>Close Alert</Button>
    </Alert>
  )
}

export default AlertError
