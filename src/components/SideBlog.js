import React from "react";
import images from "./Images";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";

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
						<img src={images[blog.id]} className="img" alt={blog.alt} />
					</div>
					<div className="post-info flex-row">
						<span>
							<i className="fas fa-calendar-alt text-gray">
								<FaCalendar />
							</i>
							&nbsp;&nbsp;{blog.date}
						</span>
					</div>
				</div>
				<div className="post-title">
					{future ? (
						<a title="Coming at some point...">{blog.title}</a>
					) : (
						<Link to={`/blogs/${blog.url}`}>{blog.title} </Link>
					)}
				</div>
			</div>
		))}
	</>
);

export default SideBlog;
