import React from 'react'
import {
  Form,
  FormGroup
} from 'react-bootstrap'

// Form to select time frame in months
function TimeFrameForm(props) {
  return (
    <div>
      <Form className="changeTimeFrameForm">
        <FormGroup>
          <Form.Label className="timeFrameLabel">Select Time Frame In Months</Form.Label>
          <Form.Control
            as="select"
            onChange={e => props.handleTimeFrameChange(e)}
            value={props.newTimeFrame ? props.newTimeFrame : '12'}
            >
            <option value="TimeFrame" disabled={true}>Select Time Frame</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
            <option value="60">60 months</option>
            </Form.Control>
        </FormGroup> 
      </Form>
    </div>
  )
}

export default TimeFrameForm
