import React from "react";
import { FaUser, FaCalendar, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import images from "./Images";
import ReactHtmlParser from "react-html-parser";

const Blogs = ({ blogs, category }) => (
	<>
		<div className="posts">
			{category ? "" : <h1>Blogs</h1>}
			{blogs.map((blog, key) => (
				<div
					className="post-content"
					data-aos="zoom-in"
					data-aos-delay="200"
					key={key}
				>
					<div className="post-image">
						<div>
							<Link to={`/blogs/${blog.url}`}>
								<img src={images[blog.id]} className="img" alt="shower" />
							</Link>
						</div>
						<div className="post-info flex-row">
							<span>
								<i className="fas fa-user text-gray">
									<FaUser />
								</i>
								&nbsp;&nbsp;Me
							</span>
							<span>
								<i className="fas fa-calendar-alt text-gray">
									<FaCalendar />
								</i>
								&nbsp;&nbsp;
								<Moment format="MMM DD, YYYY">{blog.date}</Moment>
							</span>
						</div>
					</div>
					<div className="post-title">
						<Link to={`/blogs/${blog.url}`}>
							{blog.title}
							{ReactHtmlParser(
								blog.content.slice(0, blog.content.indexOf("<br>")) + "</p>"
							)}
							<button className="btn post-btn">
								Read More &nbsp;{" "}
								<i className="fas fa-arrow-right">
									<FaArrowRight />
								</i>
							</button>
						</Link>
					</div>
					<hr
						className={`${
							blog.lastPublished | (blogs.length < 2) ? "is-hidden" : ""
						}`}
					></hr>
				</div>
			))}
		</div>
	</>
);

export default Blogs;
