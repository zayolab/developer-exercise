import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ledger} from "./ledger.js";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('ledgerAt(index) returns the correct ledgers', () => {
    const app = new App();
    const submit = app.findByProps({})
    expect(app.ledgerAt(0)).toBe(app.ledgers.revenue[0]);
    expect(app.ledgerAt(1)).toBe(app.ledgers.expenses[0]);
})

