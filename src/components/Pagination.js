import React, { useState, useEffect } from "react";

const Pagination = ({ pageSize, items, onChangePage, customLabels }) => {
	const [currItems, setCurrItems] = useState(items);
	const [currPage, setCurrPage] = useState(0);
	const noPages = Math.ceil(items.length / pageSize);

	const nextPage = () => {
		setCurrPage(currPage + 1);
		if (currPage >= noPages - 1) setCurrPage(noPages - 1);
	};
	const prevPage = () => {
		setCurrPage(currPage - 1);
		if (currPage <= 0) setCurrPage(0);
	};

	const getNoItemsOnPage = (length, perPage, page) => {
		let globalCount = 1;
		for (let i = 0; i < length; i++) {
			let count = 0;
			for (let j = 0; j < length; j++) {
				count++;
				if ((count === perPage && page === i) || globalCount === length) {
					return count;
				}
				if (globalCount === perPage) {
					globalCount++;
					count = 0;
				} else {
					globalCount++;
				}
			}
		}
		return 0;
	};

	useEffect(() => {
		const getCurrItems = (page) => {
			const noItems = getNoItemsOnPage(items.length, pageSize, page);
			setCurrItems(items.slice(page * pageSize, page * pageSize + noItems));
		};
		getCurrItems(currPage);
	}, [currPage, items, pageSize]);

	console.log(currItems);

	return (
		<div className="pagination">
			<ul>
				<li onClick={prevPage}>{customLabels.previous}</li>
				{Array.from(Array(noPages).keys()).map((i) => (
					<li key={i} onClick={() => setCurrPage(i)}>
						{i + 1}
					</li>
				))}
				<li onClick={nextPage}>{customLabels.next}</li>
			</ul>
		</div>
	);
};

export default Pagination;
