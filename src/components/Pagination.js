import React, { useState, useEffect, useRef } from "react";

import { executeScroll } from "../utils/helpers";

const Pagination = ({
	pageSize,
	items,
	onChangePage,
	customLabels,
	blogsRef,
}) => {
	const [currItems, setCurrItems] = useState(items);
	const [currPage, setCurrPage] = useState(0);
	const noPages = Math.ceil(items.length / pageSize);
	const isFirstRender = useRef(true);

	useEffect(() => {
		onChangePage(currItems);
	}, [currItems, onChangePage]);

	useEffect(() => {
		if (!isFirstRender) {
			console.log("curritems", currItems);
		}
	}, [currItems]);

	useEffect(() => {
		getCurrItems();
		isFirstRender.current = false;
		// eslint-disable-next-line
	}, [currPage]);

	const nextPage = () => {
		setCurrPage(currPage + 1);
		if (currPage >= noPages - 1) {
			setCurrPage(noPages - 1);
		}
	};

	const prevPage = () => {
		setCurrPage(currPage - 1);
		if (currPage <= 0) {
			setCurrPage(0);
		}
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
		setCurrItems(
			items.slice(currPage * pageSize, currPage * pageSize + noItems)
		);
		onChangePage(currItems);
	};

	const setDirectPage = (page) => {
		setCurrPage(page);
	};

	return (
		<div className="pagination" onClick={() => executeScroll(blogsRef)}>
			<ul onClick={() => getCurrItems()}>
				<li onClick={prevPage}>{customLabels.previous}</li>
				{Array.from(Array(noPages).keys()).map((i) => (
					<li key={i} onClick={() => setDirectPage(i)}>
						{i + 1}
					</li>
				))}
				<li onClick={nextPage}>{customLabels.next}</li>
			</ul>
		</div>
	);
};

export default Pagination;
