import Link from "next/link";
import { FaCalendar } from "react-icons/fa";
import Moment from "react-moment";

import { blokProps } from "../interfaces";

const SideBlog: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<>
			<h2>{blok.future ? "Future" : "Other"} Blogs</h2>
			{blok.other_blogs.map((blog: any, key: number) => (
				<div
					className="post-content"
					data-aos="flip-up"
					data-aos-delay="200"
					key={key}
				>
					<div className="post-image">
						<div>
							{/* If future just show image, else show image with link to that blog. */}
							{blok.future ? (
								<img src={blog.image} className="img" alt={blog.alt} />
							) : (
								<Link href={`/blogs/${blog.url}`}>
									<a>
										<img src={blog.image} className="img" alt={blog.alt} />
									</a>
								</Link>
							)}
						</div>
						<div className="post-info flex-row">
							<span>
								<i className="fas fa-calendar-alt text-gray">
									<FaCalendar />
								</i>
								&nbsp;&nbsp;
								{/* If future, show TBA for date, else show published date.*/}
								{blok.future ? (
									"TBA"
								) : (
									<Moment format="MMMM DD, YYYY">{blog.date}</Moment>
								)}
							</span>
						</div>
					</div>

					<div className="post-title">
						{/* If future show title with future tag, else show link to that blog. */}
						{blok.future ? (
							<h3 className="side-future">{blog.title}</h3>
						) : (
							<Link href={`/blogs/${blog.url}`}>
								<a>{blog.title}</a>
							</Link>
						)}
					</div>
				</div>
			))}
		</>
	);
};
export default SideBlog;
