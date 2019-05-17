import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../App.css'
import EditForm from './EditForm';
import { getRevenueList } from '../redux/selectors/revenueSelectors'
import { deleteRevenue, resultsFetchData, totals } from '../redux/action/actions'

class Revenue extends Component  {

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
  //To delete item from revenue array
  handleDelete = (index) => {
    //Dispatch action to delete item from revenue array
    this.props.deleteRevenue(index);
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
    let revenueTableData = this.props.items.map((item, index) => {
      return(
        <tr key={"revenue" + index}>
          <td>{item.id.name}</td>
          <td>${(item.id.oneTime).toFixed(2)}</td>
          <td>${(item.id.monthly).toFixed(2)}</td>
          <td><Button onClick={() => this.handleEdit('revenue', index, item.id)}>Edit</Button></td>
          <td><Button onClick={() => this.handleDelete(index)}>Delete</Button></td>
        </tr>
      )
    })

    return (
      <div className="flex-large">
        <h4> Revenues </h4>
        <Table striped responsive  className="revenue-table">
          <thead>
            <tr>
              <th>Revenue</th>
              <th>One-Time</th>
              <th>Monthly</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            { revenueTableData }
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
  const items = getRevenueList(state);
  return {
    items, 
    total: state.totals, 
    revenueItems: state.revenueItems,
    expenseItems: state.expenseItems,
    results: state.results.results
  };
}

export default connect( mapStateToProps, {deleteRevenue, totals, resultsFetchData} )(Revenue);