import React,{ Component } from 'react';
import './App.css';
import ROICalculator from './components/ROI-Calculator';

class App extends Component {

  render()
  {
    return ( 
      <div className = "App container" >
        <div className = "title">
          <h1 className = "text-center" > ROI CALCULATOR < /h1>
        </div>
        <ROICalculator / >
      </div>
    )
  }
}

export default App;