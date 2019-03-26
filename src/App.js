import React, { Component } from 'react';
import DataDisplay from './components/DataDisplay.js';
import DataEntry from './components/DataEntry.js';
import DataTotal from './components/DataTotal.js';

class App extends Component {
  render() {
    return (
      <div>
        <DataEntry />
        <DataDisplay />
        <DataTotal />
      </div>
    );
  }
}

export default App;
