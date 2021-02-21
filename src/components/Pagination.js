import React, { useState, useEffect } from "react";

const Pagination = ({ pageSize, items, onChangePage, customLabels }) => {
	const [currItems, setCurrItems] = useState(items);
	const [currPage, setCurrPage] = useState(0);
	const noPages = Math.ceil(items.length / pageSize);

	console.log("pagesize", pageSize);
	console.log("items", items);
	console.log("currpage", currPage);

	useEffect(() => {
		onChangePage(currItems);
	}, [currItems, onChangePage]);

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

	const getCurrItems = () => {
		const noItems = getNoItemsOnPage(items.length, pageSize, currPage);
		console.log("noitems", noItems);
		setCurrItems(
			items.slice(currPage * pageSize, currPage * pageSize + noItems)
		);
		onChangePage(currItems);
		console.log("curritems", currItems);
	};

	return (
		<div className="pagination">
			<ul onClick={() => getCurrItems()}>
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
