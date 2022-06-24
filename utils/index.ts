import { useEffect, useRef } from "react";

export const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://blog.tinomuzambi,com"
		: "http://localhost:3000";

/**
 * Computes the number of items that should be visible on a given page.
 * @param length The length of the items.
 * @param perPage The number of items that should be visible per page.
 * @param page The current page.
 * @returns The number of items that should be on the current page
 */
export const getNoItemsOnPage = (
	length: number,
	perPage: number,
	page: number
) => {
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

/**
 * Custom hook to only run the callback function after the initial render.
 * @param func The callback function to run
 * @param deps The dependecy array for useEffect
 */
export const useDidMountEffect = (func: Function, deps: any[]) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};
