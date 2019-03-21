import React from 'react';
import './TableData.css';


const TableData = (props) => {
    return (
          <table className="revenue-table expenses-table">
             <thead>
                <tr className="rows">
                   <th>{props.name}</th>
                </tr>
                <tr className="rows">
                  <th></th>
                  <th>One-Time</th>
                  <th>Monthly</th>
                  <th></th>
                </tr>
              </thead>
         </table>
    )
};
export default TableData;
