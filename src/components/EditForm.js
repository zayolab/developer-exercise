import React,{ Component } from 'react'
import { Row, Col, Button, Form, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../App.css'
import { editRevenue, editExpense, totals, resultsFetchData } from '../redux/action/actions'

class EditForm extends Component {
  constructor(props)
  {
    super(props);
    // "seed" data initially
    this.state = {
      newType: '',
      newName: '',
      newOneTime: '',
      newMonthly: '',
      error: false
    }
    // handling add  function
    this.handleUpdate = this.handleUpdate.bind(this)

    // controlled form elements functions
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this)
  }

  // controlled form elements, watch for changes
  handleTypeChange(e)
  {
    this.setState({
      newType: e.target.value
    })
  }
  handleNameChange(e)
  {
    this.setState({
      newName: e.target.value
    })
  }

  handleMonthlyChange(e)
  {
    this.setState({
      newMonthly: Number(e.target.value)
    })
  }
  handleOneTimeChange(e)
  {
    this.setState({
      newOneTime: Number(e.target.value)
    })
  }

  //Close modal
  handleCancel = (e) => {
    e.preventDefault()
    this.props.onHide()
  }

  // update new expense or revenue
  handleUpdate = (e) => {
    e.preventDefault()
    // this.onHandleEdit()
    let newType=  this.props.data.type;
    let newName= this.state.newName ? this.state.newName : this.props.data.item.name;
    let newOneTime= this.state.newOneTime ? this.state.newOneTime : this.props.data.item.oneTime;
    let newMonthly= this.state.newMonthly ? this.state.newMonthly : this.props.data.item.monthly;

    let item = {
      name: newName,
      oneTime: newOneTime,
      monthly: newMonthly
    }
    //Dispatch action to update revenue or expense
    if(newType === 'revenue'){
      this.props.editRevenue(item,this.props.data.index);
    } else {
      this.props.editExpense(item, this.props.data.index);
    }
    //Dispatch action to update totals and results
    let revenueItems = this.props.revenueItems;
    let expenseItems = this.props.expenseItems;
    this.props.totals(revenueItems, expenseItems);
    let total = this.props.total.totals;
    this.props.resultsFetchData(total);
    this.props.onHide();
    // clear errors displaying and form contents
    this.setState({
      error: false,
      newName: '',
      newMonthly: '',
      newOneTime: '',
      newType: ''
    })
  }


  render()
  {
    return (
      {/*Modal to edit revenue or expense*/},
      <Modal {...this.props.data} 
           show={this.props.show}
          onHide={this.props.onHide}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className = "modalTitle">
            Edit {this.props.data.type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Row className = "input-field justify-content-md-center" > 
              <Col sm = { 5 } className = "input-field" >
                <Form.Label className = "fwbold" >Name</Form.Label>
                <Form.Control 
                  type = "text"
                  onChange = { this.handleNameChange }
                  value = { this.state.newName ? this.state.newName : this.props.data.item.name } /> 
              </Col>
              <Col sm = { 3 } className = "input-field" >
                <Form.Label className = "fwbold" >One-Time</Form.Label>
                <Form.Control 
                  type = "number"
                  onChange = { this.handleOneTimeChange }
                  step = "0.01"
                  min = "0"
                  value = { (this.state.newOneTime || this.state.newOneTime === 0) ? this.state.newOneTime : this.props.data.item.oneTime } /> 
              </Col> 
              <Col sm = { 3 } className = "input-field" >
                <Form.Label className = "fwbold" >Monthly</Form.Label>
                <Form.Control 
                  type = "number"
                  onChange = { this.handleMonthlyChange }
                  step = "0.01"
                  min = "0"
                  value = { (this.state.newMonthly || this.state.newMonthly === 0) ? this.state.newMonthly : this.props.data.item.monthly } /> 
              </Col> 
            </Row>
            <Row className = "input-field justify-content-md-center" >
              <Col sm = { 3 } className = "add-form-button" >
                <Button type = "submit" onClick = { this.handleUpdate } > Update </Button> 
              </Col>
              <Col sm = { 3 } className = "add-form-button" >
                <Button type = "cancel" onClick = {this.handleCancel}> Cancel </Button> 
              </Col> 
            </Row> 
          </Form>
          { /* form errors */ }
          { this.state.error && <h4 className = "error text-center" > Please fill out all fields < /h4>} 
        </Modal.Body>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    total: state.totals, 
    revenueItems: state.revenueItems,
    expenseItems: state.expenseItems,
    results: state.results.results,
  };
}

export default connect( mapStateToProps, {editRevenue, editExpense, totals, resultsFetchData} )(EditForm);