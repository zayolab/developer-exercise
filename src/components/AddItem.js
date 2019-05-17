import React,{ Component } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../App.css'
import { addRevenue, addExpense, totals, resultsFetchData } from '../redux/action/actions'

class AddItem extends Component {
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
        this.handleAdd = this.handleAdd.bind(this)

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


    // add new expense or revenue
    handleAdd(e)
    {
        e.preventDefault()
        // handle form errors, allows one-time and revenue amounts to be 0
        if (!this.state.newType || !this.state.newName || (!this.state.newOneTime && this.state.newOneTime !== 0) || (!this.state.newMonthly && this.state.newMonthly !== 0))
        {
            this.setState({
                error: true
            })
        }
        // if there are no form errors, add accordingly
        else
        {
            // typeOfAmount will be either 'expenses' or 'revenue'
            let typeOfAmount = this.state.newType

            // grab state array of revenues or expenses
            let item = {
                name: this.state.newName,
                oneTime: this.state.newOneTime,
                monthly: this.state.newMonthly
            }

            if(typeOfAmount === 'revenue'){
                this.props.addRevenue(item);
            } else {
                this.props.addExpense(item);
            }

            let revenueItems = this.props.revenueItems;
            let expenseItems = this.props.expenseItems;
            this.props.totals(revenueItems, expenseItems);
            let total = this.props.total.totals;
            this.props.resultsFetchData(total);

            this.setState({
                error: false,
                newName: '',
                newMonthly: '',
                newOneTime: '',
                newType: ''
            })
        }
    }


    render()
    {
        return ( 
            <div >
                <h4> Add Revenue or Expense </h4>
                { /* Add new expense or revenue form */ } 
                <Form className = "addExpenseOrRevenueForm" onSubmit = { this.handleAdd } >
                    <Row className = "input-field" >
                        <Col sm = { { span: 2, offset: 1 } } className = "input-field" >
                            <Form.Control 
                                as = "select" 
                                onChange = { this.handleTypeChange }
                                value = { this.state.newType ? this.state.newType : 'choose' } >
                                    <option value = "choose" disabled = {true} > Select Type < /option> 
                                    <option value = "revenue" > Revenue < /option> 
                                    <option value = "expenses" > Expense < /option> 
                            </Form.Control> 
                        </Col> 
                        <Col sm = { 3 } className = "input-field" >
                            <Form.Control 
                                type = "text"
                                placeholder = "Name"
                                onChange = { this.handleNameChange }
                                value = { this.state.newName ? this.state.newName : '' } /> 
                        </Col>
                        <Col sm = { 2 } className = "input-field" >
                            <Form.Control 
                                type = "number"
                                placeholder = "One-Time Amount"
                                onChange = { this.handleOneTimeChange }
                                step = "0.01"
                                min = "0"
                                value = { (this.state.newOneTime || this.state.newOneTime === 0) ? this.state.newOneTime : '' } /> 
                        </Col> 
                        <Col sm = { 2 } className = "input-field" >
                            <Form.Control 
                                type = "number"
                                placeholder = "Monthly Amount"
                                onChange = { this.handleMonthlyChange }
                                step = "0.01"
                                min = "0"
                                value = { (this.state.newMonthly || this.state.newMonthly === 0) ? this.state.newMonthly : '' } /> 
                        </Col> 
                        <Col sm = { 1 } className = "add-form-button" >
                            <Button type = "submit" > Add </Button> 
                        </Col> 
                    </Row> 
                </Form>
                { /* form errors */ }
                { this.state.error && <h4 className = "error text-center" > Please fill out all fields < /h4>} 
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        total: state.totals, 
        revenueItems: state.revenueItems,
        expenseItems: state.expenseItems,
        results: state.results.results
    };
}

export default connect(mapStateToProps,{addRevenue, addExpense, totals, resultsFetchData})(AddItem)