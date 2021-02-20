import React from "react";

const Pagination = ({ pageSize, items, onChangePage, customLabels }) => {
	console.log(Array.from(Array(items.length % pageSize).keys()));
	return (
		<div className="pagination">
			<ul>
				<li>{customLabels.previous}</li>
				{Array.from(Array(items.length % pageSize).keys()).map((i) => (
					<li>{i + 1}</li>
				))}
				<li>{customLabels.next}</li>
			</ul>
		</div>
	);
};

export default Pagination;
