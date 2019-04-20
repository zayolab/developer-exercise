import React from 'react'

const Revenue = ({oneTimeRevenueState,monthlyRevenueState,totalRevenueState}) => {
  return(

      <tr>
        <td>Revenue</td>
        <td>${(oneTimeRevenueState).toFixed(2)}</td>
        <td>${(monthlyRevenueState).toFixed(2)}</td>
        <td>${totalRevenueState.toFixed(2)}</td>
      </tr>
    
  )
}
export default Revenue
