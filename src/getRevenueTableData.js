import React from 'react';
import {Button} from 'react-bootstrap'
import './App.css'

export const getRevenueTableData = (revenue, onDelete) => {
  return (
    revenue.map((revenue, index) => {
      return (
        <tr key={"revenue" + index}>
          <td>{revenue.name}</td>
          <td>${revenue.oneTime.toFixed(2)}</td>
          <td>${revenue.monthly.toFixed(2)}</td>
          <td><Button onClick={() => onDelete('revenue', index)}>Delete</Button></td>
        </tr>
      );
    })
  );
}  
