import React from 'react';

const revenueTableData = (props) => {
    return (
        <tr key={"revenue" + props.index}>
                <td>{props.name}</td>
                <td>${props.oneTime.toFixed(2)}</td>
                <td>${props.monthly.toFixed(2)}</td>
                <td>
                <button
                    className="btn btn-outline-danger"
                    onClick={props.click}> Delete
                </button>
            </td>
        </tr>
    )
};
export default revenueTableData;
