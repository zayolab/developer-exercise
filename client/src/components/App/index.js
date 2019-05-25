import React, { Component } from "react"
import AddItem from "../AddItem/index"
import ROITables from "../ROITables"
import seedData from "../../seed/seedData"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      //...seedData,
      revenue: [],
      expenses: [],
      error: false,
      errorMsg: ""
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.triggerError = this.triggerError.bind(this)
    this.fetchTransactions = this.fetchTransactions.bind(this)
  }

  componentDidMount() {
    this.fetchTransactions("expenses")
    this.fetchTransactions("revenue")
  }

  fetchTransactions(type) {
    fetch(`http://localhost:4000/api/${type}`)
      .then(res => res.json())
      .then(({ success, res }) => {
        if (!success) {
          this.triggerError(true, "Could not load data")
        } else {
          this.setState({ [type]: res, error: false })
        }
      })
      .catch(err => {
        console.error(err)
        this.triggerError(true, "Could not load data")
      })
  }

  handleDelete(type, item) {
    fetch(`http://localhost:4000/api/${type}/${item.id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(({ success }) => {
        if (!success) {
          this.triggerError(true, "Could not delete row")
        } else {
          let listType = this.state[type]

          this.setState({
            [type]: listType.filter(i => i.id !== item.id)
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.triggerError(true, "Could not delete row")
      })
  }

  handleAdd({ newName, newMonthly, newOneTime, newType }) {
    const transactionBody = {
      name: newName,
      one_time: newOneTime,
      monthly: newMonthly
    }

    fetch(`http://localhost:4000/api/${newType}`, {
      method: "POST",
      body: JSON.stringify(transactionBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(({ success, res }) => {
        if (!success) {
          this.triggerError(true, "Could not add row")
        } else {
          let monthly =
            newType === "expenses" ? "monthlyExpense" : "monthlyRevenue"
          let oneTime =
            newType === "expenses" ? "oneTimeExpense" : "oneTimeRevenue"
          let items = [...this.state[newType]]
          items.push(res)
          this.setState({
            error: false,
            [newType]: items,
            [monthly]: this.state[monthly] + newMonthly,
            [oneTime]: this.state[oneTime] + newOneTime
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.triggerError(true, "Could not add row")
      })
  }

  triggerError(error = true, errorMsg) {
    this.setState({ error, errorMsg })
  }

  render() {
    const { revenue, expenses, error, errorMsg } = this.state

    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        <AddItem triggerError={this.triggerError} handleAdd={this.handleAdd} />
        {error && <h4 className="error text-center">{errorMsg}</h4>}
        <ROITables
          revenue={revenue}
          expenses={expenses}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}

export default App
