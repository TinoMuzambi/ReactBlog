import React from "react";
import blogs from "../data/blogs";
import img from "../assets/blog-images/me_crop.jpg";
import { FaUser, FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Blogs = () => (
	<>
		<section className="container" id="blogs">
			<div className="posts">
				<h1>Blogs</h1>
				{blogs.map((blog, key) => (
					<div className="post-content" data-aos="zoom-in" data-aos-delay="200">
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
							<a>{blog.title}</a>
							<p>{blog.content[0]}</p>
							<Link to={`/blogs/${blog.url}`}>
								<button className="btn post-btn">
									Read More &nbsp; <i className="fas fa-arrow-right"></i>
								</button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	</>
);

export default Blogs;
