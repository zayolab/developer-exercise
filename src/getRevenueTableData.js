import React from 'react';
import './App.css'

export const getRevenueTableData = (revenue) => {
  return (
    revenue.map((item, index) => {
      return (
        <tr key={"revenue" + index}>
          <td>{item.name}</td>
          <td>${item.oneTime.toFixed(2)}</td>
          <td>${item.monthly.toFixed(2)}</td>
        </tr>
      )
    })
  );
}