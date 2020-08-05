import React from "react";
import img from "../assets/blog-images/me_crop.jpg";
import { FaUser, FaCalendar, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Blogs = ({ blogs }) => (
	<>
		<section className="container" id="blogs">
			<div className="posts">
				<h1>Blogs</h1>
				{blogs.map((blog, key) => (
					<div
						className="post-content"
						data-aos="zoom-in"
						data-aos-delay="200"
						key={key}
					>
						<div className="post-image">
							<div>
								<img src={img} className="img" alt="shower" />
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
							<Link to={`/blogs/${blog.url}`}>{blog.title}</Link>
							<p>{blog.content[0]}</p>
							<Link to={`/blogs/${blog.url}`}>
								<button className="btn post-btn">
									Read More &nbsp;{" "}
									<i className="fas fa-arrow-right">
										<FaArrowRight />
									</i>
								</button>
							</Link>
						</div>
						<hr></hr>
					</div>
				))}
			</div>
		</section>
	</>
);

export default Blogs;
