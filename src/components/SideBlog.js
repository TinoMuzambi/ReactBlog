import React from "react";
import img from "../assets/blog-images/me_crop.jpg";
import futureBlogs from "../data/future-blogs";
import { FaCalendar } from "react-icons/fa";

const SideBlog = () => (
	<>
		<h2>Future Blogs</h2>
		{futureBlogs.map((blog, key) => (
			<div className="post-content" data-aos="flip-up" data-aos-delay="200">
				<div className="post-image">
					<div>
						<img src={img} className="img" alt={blog.alt} />
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
					<a title="Coming at some point...">{blog.title}</a>
				</div>
			</div>
		))}
	</>
);

export default SideBlog;
