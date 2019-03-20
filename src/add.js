import App from './App'

class Add{

    add(e) {
        e.preventDefault()
        // handle form errors, allows one-time and revenue amounts to be 0
        if (App.state.newType || !App.state.newName || (!App.state.newOneTime && App.state.newOneTime !== 0) || (!App.state.newMonthly && App.state.newMonthly !== 0)) {
          App.setState({
            error: true
          })
        }
        // if there are no form errors, add accordingly
        else {
          // typeOfAmount will be either 'expenses' or 'revenue'
          let typeOfAmount = App.state.newType
          let monthly = typeOfAmount === 'expenses' ? 'monthlyExpense' : 'monthlyRevenue'
          let oneTime = typeOfAmount === 'expenses' ? 'oneTimeExpense' : 'oneTimeRevenue'
          // grab state array of revenues or expenses
          let items = App.state[typeOfAmount]
          items.push({
            name: App.state.newName,
            oneTime: App.state.newOneTime,
            monthly: App.state.newMonthly
          })
          // set state with new totals and items array, clear errors displaying and form contents
          App.setState({
            error: false,
            [typeOfAmount]: items,
            [monthly]: App.state[monthly] + App.state.newMonthly,
            [oneTime]: App.state[oneTime] + App.state.newOneTime,
            //  Clear values in form
            newName: '',
            newMonthly: '',
            newOneTime: '',
            newType: ''
          })
        }
      }

}

export default Add;