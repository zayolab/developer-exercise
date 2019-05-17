import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../App.css'
import EditForm from './EditForm'
import { getExpenseList } from '../redux/selectors/expenseSelectors'
import { deleteExpense, totals, resultsFetchData } from '../redux/action/actions'

class Expense extends Component  {

  constructor(props)
  {
    super(props);
    // "seed" data initially
    this.state = {
      items: {
        type:'',
        index:0,
        item: {}
      },
      modalShow: false
    }
  } 

  //To delete item from expense array
  handleDelete = (index) => {
    //Dispatch action to delete item from expense array
    this.props.deleteExpense(index);
    //Dispatch action to update totals
    let revenueItems = this.props.revenueItems;
    let expenseItems = this.props.expenseItems;
    this.props.totals(revenueItems, expenseItems);
    //Dispatch action to update results
    let total = this.props.total.totals;
    this.props.resultsFetchData(total);
  }
  //To set item for edit modal
  handleEdit = (type, index, item) => {
    let items = {
      type: type,
      index: index,
      item: item
    }
    this.setState({
      items: items,
      modalShow: true
    })
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    let expensesTableData = this.props.items.map((item, index) => {
      return(
        <tr key={"expenses" + index}>
          <td>{item.id.name}</td>
          <td>${(item.id.oneTime).toFixed(2)}</td>
          <td>${(item.id.monthly).toFixed(2)}</td>
          <td><Button onClick={() => this.handleEdit('expenses', index, item.id)}>Edit</Button></td>
          <td><Button onClick={() => this.handleDelete(index)}>Delete</Button></td>
        </tr>
      )
    })

    return (
      <div className="flex-large">
        <h4> Expenses </h4>
        <Table striped responsive  className="expenses-table">
          <thead>
            <tr>
              <th>Expense</th>
              <th>One-Time</th>
              <th>Monthly</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            { expensesTableData }
          </tbody>
        </Table>
        <div>
          <EditForm data={this.state.items} show={this.state.modalShow} onHide={modalClose} />
        </div> 
      </div>  
    )
  }
}

const mapStateToProps = state => {
  const items = getExpenseList(state);
  return {
    items, 
    total: state.totals, 
    revenueItems: state.revenueItems,
    expenseItems: state.expenseItems,
  };
}


export default connect( mapStateToProps, {deleteExpense, totals, resultsFetchData} )(Expense);
