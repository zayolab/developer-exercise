import React,{ Component } from 'react'
import '../App.css'
import AddItem from './AddItem'
import Revenue from './Revenue'
import Expense from './Expense'
import Totals from './Totals'


/* eslint-disable no-unused-vars */

class ROICalculator extends Component
{
  render() {
    return ( 
    <div className = "mt20" >
      { /* Add new expense or revenue form */ } 
      <AddItem />
      { /* Revenue Table */ } 
      <Revenue />
      { /* Expenses Table */ } 
      <Expense />
      { /* Totals Table */ } 
      <Totals  />
    </div> 
    )
  }
}

export default ROICalculator;