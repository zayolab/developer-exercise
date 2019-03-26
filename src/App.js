import React, { Component } from 'react';
import DataTable from './components/DataTable.js';
// import DataEntry from './components/DataEntry.js';
import Calculations from './components/Calculations.js';
import seedData from './data/seedData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue: seedData.revenue,
      expenses: seedData.expenses,
      oneTimeRevenue: 175,
      oneTimeExpense: 700,
      monthlyRevenue: 160,
      monthlyExpense: 60
    }
  }

  render() {
    const { revenue, expenses } = this.state;
    console.log(revenue);
    console.log(expenses);

    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        <DataTable
          title={'Revenue'}
          data={revenue}
          onUpdateTableData={(revenue) => this.setState({ revenue })}
        />
        <DataTable
          title={'Expenses'}
          data={expenses}
          onUpdateTableData={(expenses) => this.setState({ expenses })}
        />
        <Calculations />
      </div>
    );
  }
}

export default App;
