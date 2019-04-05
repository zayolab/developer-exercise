import React from 'react';
const exp = (props) => {
	return (
		<div className="Expenses">
				<table className="expenses-table">
					<thead>
						<tr>
							<th>Expenses</th>
						</tr>
						<tr>
							<th></th>
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
export default exp;