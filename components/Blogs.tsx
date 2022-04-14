import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Blogs: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<>
			<div className="posts">
				{blok.blogs.length ? (
					<>
						{blok.blogs.map((blog: any, key: number) => (
							<DynamicComponent blok={blog} key={key} />
						))}
						<div className="page-holder text-center">
							{/* Pagination element */}
							{blok.blogs.length && (
								<Pagination
									items={blok.blogs}
									onChangePage={handlePageChange}
									pageSize={4}
									customLabels={customLabels}
									customRef={blogsRef}
								/>
							)}
						</div>
					</>
				) : (
					<h1>No blogs matching search</h1>
				)}
			</div>
		</>
	);
};
export default Blogs;
