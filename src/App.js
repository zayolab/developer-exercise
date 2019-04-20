import React, { useState } from 'react';
import {

 } from 'react-bootstrap'
import AddDataForm from './components/AddDataForm'
import EditDataForm from './components/EditDataForm'
import ResultsTable from './components/ResultsTable'
import DataTable from './components/DataTable'
import Header from './components/Header'

const App = () => {

/************************ App Data ********************************/

  /****** Leaving Dummy Data for Example Purposes *****/
  const revenueData = [
    {id: 1, name: "Item 1", oneTime:100, monthly: 50, type: "Revenue"},
    {id: 2, name: "Item 2", oneTime:50, monthly: 25, type: "Revenue" },
    {id: 3, name: "Item 3", oneTime:25, monthly: 85, type: "Revenue" }
  ]
  const expenseData = [
    {id: 1, name: "Expense 1", oneTime:500, monthly: 20, type: "Expense" },
    {id: 2, name: "Expense 2", oneTime:200, monthly: 40, type: "Expense" }
  ]

  const initialDataEditForm = {id: null, name: '', oneTime: 0, monthly: 0, type: ""}

/************* Functional component state *************************/

  const [revenue, setRevenue] = useState(revenueData)
  const [expense, setExpense] = useState(expenseData)
  const [editingData, setEditingData] = useState(false)
  const [currentData, setCurrentData] = useState(initialDataEditForm)

/*********************** Methods *********************************/

  /******* Add Data *******/
  const addData = newData => {
    newData.oneTime = parseFloat(newData.oneTime)
    newData.monthly = parseFloat(newData.monthly)
    if(newData.type === "Revenue"){
      newData.id = revenue.length + 1
      setRevenue([...revenue, newData])
    }
    else {
      newData.id = expense.length + 1
      setExpense([...expense, newData])
    }
  }
  /********* Delete Data ********/
  const deleteAllExpenses = () => {
    setExpense([])
  }
  const deleteAllRevenue = () => {
    setRevenue([])
  }
  const deleteAllRevenueAndExpenses = () => {
    deleteAllRevenue()
    deleteAllExpenses()
  }
  const deleteData = (id, type) => {
    if(type === 'Revenue'){
      setRevenue(revenue.filter(revenue => revenue.id !== id))
    }
    else{
      setExpense(expense.filter(expense => expense.id !== id))
    }
  }
  /********** Edit Data **********/
  const editDataRow = (data, type) => {
    setEditingData(true)
    if(type === 'Revenue') {
      setCurrentData({id: data.id, name: data.name, oneTime: data.oneTime, monthly: data.monthly, type: 'Revenue'})
    }
    else {
      setCurrentData({id: data.id, name: data.name, oneTime: data.oneTime, monthly: data.monthly, type: 'Expense'})
    }
  }
  const updateData = (id, updatedData) => {
    setEditingData(false)
    if(updatedData.type === "Revenue") {
    setRevenue(revenue.map(revenue => (revenue.id === id ? updatedData : revenue)))
    }
    else {
      setExpense(expense.map(expense => (expense.id === id ? updatedData : expense)))
    }
  }

/************************ App Return *****************************/

  return (
    <div className="container">
      <Header
        deleteAllRevenueAndExpenses={deleteAllRevenueAndExpenses}/>
          {editingData ? (
            <EditDataForm
              setEditingData={setEditingData}
              setRevenue={setRevenue}
              deleteData={deleteData}
              currentData={currentData}
              updateData={updateData}
            />)
          : (
            <AddDataForm
              addData={addData}
            />)
          }
        <DataTable
          type="Revenue"
          dataSource={revenue}
          deleteData={deleteData}
          deleteAllRevenue={deleteAllRevenue}
          editingData={editingData}
          editDataRow={editDataRow}
        />
        <DataTable
          type="Expense"
          dataSource={expense}
          deleteData={deleteData}
          deleteAllExpenses={deleteAllExpenses}
          editingData={editingData}
          editDataRow={editDataRow}
        />
        <ResultsTable
          revenue={revenue}
          expense={expense}
        />
    </div>
  )
}
export default App;
