import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { blokProps } from "../interfaces";
import { getNoItemsOnPage } from "../utils";
import { executeScroll } from "../utils/helpers";
import DynamicComponent from "./DynamicComponent";

const Blogs: React.FC<blokProps> = ({ blok }): JSX.Element => {
	const [startPos, setStartPos] = useState(0);
	const [endPos, setEndPos] = useState(0);
	const [currPage, setCurrPage] = useState(0);
	const [query, setQuery] = useState("");
	const [displayBlogs, setDisplayBlogs] = useState(blok.blogs);
	const [originalBlogs, _] = useState(blok.blogs);

	const router = useRouter();
	const noPages = Math.ceil(blok.blogs.length / 3);

	useEffect(() => {
		if (router.query.search) {
			setQuery(router.query.search as string);
			executeScroll(ref);
		}
	}, [router]);

	const handlePageChange = (start: number, end: number) => {
		// Handing pagination page changes.
		setStartPos(start);
		setEndPos(end);
	};

	useEffect(() => {
		const noItems = getNoItemsOnPage(blok.blogs.length, 3, currPage);

		handlePageChange(currPage * 3, currPage * 3 + noItems);
	}, [blok.blogs.length, currPage]);

	useEffect(() => {
		setCurrPage(0);
	}, []);

	useEffect(() => {
		setDisplayBlogs(
			originalBlogs.filter(
				(blog: any) =>
					blog.content.url.toLowerCase().includes(query.toLowerCase()) ||
					blog.content.title.toLowerCase().includes(query.toLowerCase()) ||
					blog.content.content.toLowerCase().includes(query.toLowerCase())
			)
		);
	}, [originalBlogs, query]);

	/**
	 * Switch to next page of items check against going past last page.
	 */
	const nextPage = () => {
		setCurrPage(currPage + 1);
		if (currPage >= noPages - 1) {
			setCurrPage(noPages - 1);
		}
	};

	/**
	 * Switch to previous page of items and check against going before first page.
	 */
	const prevPage = () => {
		setCurrPage(currPage - 1);
		if (currPage <= 0) {
			setCurrPage(0);
		}
	};

	/**
	 * Directly switch to clicked on page.
	 * @param page The page to switch to.
	 */
	const setDirectPage = (page: number) => {
		setCurrPage(page);
	};

	const customLabels = {
		// Custom labels for pagination.
		previous: <FaChevronLeft />,
		next: <FaChevronRight />,
	};

	const ref = useRef(null);

	return (
		<>
			<section className="container" id="blogs">
				<section className="site-content">
					<section className="blogs">
						<div className="search-wrapper">
							<div className="search-field">
								<input
									type="text"
									id="searchBlogs"
									placeholder="Search Blogs"
									className="search-input"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
								/>
							</div>
						</div>
						<div className="posts" ref={ref}>
							<h1>{blok.title}</h1>
							{displayBlogs.length ? (
								<>
									{displayBlogs
										.sort((a: any, b: any) =>
											b.content?.date.localeCompare(a.content?.date)
										)

										// .slice(startPos, endPos)
										.map((blog: any, key: number) => (
											<DynamicComponent blok={blog.content} key={key} />
										))}
									<div className="page-holder text-center">
										{/* Pagination element */}
										{displayBlogs.length && (
											<div
												className="pagination"
												onClick={() => executeScroll(ref)}
											>
												<ul>
													<li onClick={prevPage}>{customLabels.previous}</li>
													{Array.from(Array(noPages).keys()).map((i) => (
														<li key={i} onClick={() => setDirectPage(i)}>
															{i + 1}
														</li>
													))}
													<li onClick={nextPage}>{customLabels.next}</li>
												</ul>
											</div>
										)}
									</div>
								</>
							) : (
								<h1>No blogs matching search</h1>
							)}
						</div>
					</section>
					<DynamicComponent blok={blok.sidebar[0]} />
				</section>
			</section>
		</>
	);
};
export default Blogs;
