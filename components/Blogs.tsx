import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";
import Pagination from "./Pagination";

const Blogs: React.FC<blokProps> = ({ blok }): JSX.Element => {
	const [displayBlogs, setDisplayBlogs] = useState(blok.blogs);
	const [blogItems, setBlogItems] = useState(blok.blogs);

	const handlePageChange = (paginatedBlogs: any[]) => {
		// Handing pagination page changes.
		console.log(paginatedBlogs);
		setDisplayBlogs(paginatedBlogs);
	};

	useEffect(() => {
		setBlogItems(blok.blogs);
		setDisplayBlogs(blok.blogs);
	}, [blok.blogs]);

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
						<div className="posts">
							<h1>{blok.title}</h1>
							{displayBlogs.length ? (
								<>
									{displayBlogs
										.sort((a: any, b: any) =>
											b.content?.date.localeCompare(a.content?.date)
										)
										.map((blog: any, key: number) => (
											<DynamicComponent blok={blog.content} key={key} />
										))}
									<div className="page-holder text-center">
										{/* Pagination element */}
										{blogItems.length && (
											<Pagination
												items={blok.blogs}
												onChangePage={handlePageChange}
												pageSize={3}
												customLabels={customLabels}
												customRef={ref}
											/>
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
