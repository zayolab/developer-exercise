import React, { Component } from 'react';
import {
  Button
 } from 'react-bootstrap'
import './App.css';
import AddDeleteItem from './AddDeleteItem'
import Totals from './Totals'

class App extends Component {

  render() {
    return (
      <div>
      {/*Add/Delete Revenue/Expense Item Component which contains the Totals component*/}
        {<AddDeleteItem />}
      </div>
    );
  }
}

export default App;
