import React from "react";
import images from "./Images";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const SideBlog = ({ blogs, future }) => (
	<>
		<h2>{future ? "Future" : "Other"} Blogs</h2>
		{blogs.map((blog, key) => (
			<div
				className="post-content"
				data-aos="flip-up"
				data-aos-delay="200"
				key={key}
			>
				<div className="post-image">
					<div>
						{future ? (
							<img src={images[blog.id]} className="img" alt={blog.alt} />
						) : (
							<Link to={`/blogs/${blog.url}`}>
								<img src={images[blog.id]} className="img" alt={blog.alt} />{" "}
							</Link>
						)}
					</div>
					<div className="post-info flex-row">
						<span>
							<i className="fas fa-calendar-alt text-gray">
								<FaCalendar />
							</i>
							&nbsp;&nbsp;
							{future ? (
								"TBA"
							) : (
								<Moment format="MMMM DD, YYYY">{blog.date}</Moment>
							)}
						</span>
					</div>
				</div>

				<div className="post-title">
					{future ? (
						<h3 title="Coming at some point..." className="side-future">
							{blog.title}
						</h3>
					) : (
						<Link to={`/blogs/${blog.url}`}>{blog.title} </Link>
					)}
				</div>
			</div>
		))}
	</>
);

export default SideBlog;
