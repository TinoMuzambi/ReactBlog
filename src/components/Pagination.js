import React, { useState } from "react";

const Pagination = ({ pageSize, items, onChangePage, customLabels }) => {
	const [currItems, setCurrItems] = useState([]);
	const [currPage, setCurrPage] = useState(0);
	const noPages = items.length % pageSize;

	const nextPage = () => {
		setCurrPage(currPage + 1);
		if (currPage >= noPages - 1) setCurrPage(noPages - 1);
	};
	const prevPage = () => {
		setCurrPage(currPage - 1);
		if (currPage <= 0) setCurrPage(0);
	};
	return (
		<div className="pagination">
			<ul>
				<li onClick={prevPage}>{customLabels.previous}</li>
				{Array.from(Array(noPages).keys()).map((i) => (
					<li>{i + 1}</li>
				))}
				<li onClick={nextPage}>{customLabels.next}</li>
			</ul>
		</div>
	);
};

export default Pagination;
