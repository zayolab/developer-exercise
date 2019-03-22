import React from 'react';
// import './Expenses.css';

const expenses = (props) => {

  return (
    <div className="Expenses">
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Expenses</th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.delete}
        </tbody>
      </table>
    </div>

  )
};

export default expenses;