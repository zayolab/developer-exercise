import React from 'react';

const rev = (props) => {
	
	return (
		<div className="Revenue">
				<table className="revenue-table">
					<thead>
						<tr>
							<th>Revenue</th>
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

export default rev;