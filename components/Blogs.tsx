import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";
import Pagination from "./Pagination";

const Blogs: React.FC<blokProps> = ({ blok }): JSX.Element => {
	const handlePageChange = (paginatedBlogs: any[]) => {
		// Handing pagination page changes.
		// setDisplayBlogs(paginatedBlogs);
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
						<div className="posts">
							<h1>Blogs</h1>
							{blok.blogs.length ? (
								<>
									{blok.blogs
										.sort((a: any, b: any) =>
											b.content.date.localeCompare(a.content.date)
										)
										.map((blog: any, key: number) => (
											<DynamicComponent blok={blog.content} key={key} />
										))}
									<div className="page-holder text-center">
										{/* Pagination element */}
										{blok.blogs.length && (
											<Pagination
												items={blok.blogs}
												onChangePage={handlePageChange}
												pageSize={4}
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
