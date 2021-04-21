import React, { useState, useEffect } from "react";
import { FaUser, FaCalendar } from "react-icons/fa";
import Moment from "react-moment";
import ReactHtmlParser from "react-html-parser";
import { useLocation } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import { Helmet } from "react-helmet";

import Sidebar from "../components/Sidebar";
import { getBlogs } from "../utils/fetch";
import Comments from "../components/Comments/Comments";
import Loader from "../components/Loader";

const Blog = ({ categories }) => {
	const location = useLocation();
	const pathname = location.pathname.substring(7);

	const [name, setName] = useState(pathname);
	const [fetching, setFetching] = useState(true);
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		setName(pathname);
	}, [pathname]);

	useEffect(() => {
		const getData = async () => {
			const dataBlogs = await getBlogs();
			setBlogs(dataBlogs);
			setFetching(false);
		};
		getData();
	}, []);

	if (fetching)
		return (
			/* Preloader for showing before page loads. */
			<div className="icon-wrapper large">
				<AiOutlineReload className="icon" />
			</div>
		);

	const title = name; // Finding relevant blog.
	const blog = blogs.find((blogParam) => blogParam.url === title);
	const filteredBlogs = blogs // Getting list that doesn't include current blog nor future blogs for other blogs section.
		.filter((eachItem) => {
			return (
				!eachItem["url"].toLowerCase().includes(title.toLowerCase()) &&
				!eachItem["future"] === true
			);
		})
		.slice(0, 3);
	return (
		<>
			<Helmet>
				<title>{blog.title + " | Blog.TinoMuzambi"}</title>
				<meta name="description" content={blog.title} />

				{/* <!-- Google / Search Engine Tags --> */}
				<meta itemprop="name" content={blog.title + " | Blog.TinoMuzambi"} />
				<meta itemprop="description" content={blog.title} />
				<meta itemprop="image" content={blog.image} />

				{/* <!-- Facebook Meta Tags --> */}
				<meta
					property="og:url"
					content={"https://blog.tinomuzambi.com/blogs/" + blog.url}
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content={blog.title + " | Blog.TinoMuzambi"}
				/>
				<meta property="og:description" content={blog.title} />
				<meta property="og:image" content={blog.image} />

				{/* <!-- Twitter Meta Tags --> */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content={blog.title + " | Blog.TinoMuzambi"}
				/>
				<meta name="twitter:description" content={blog.title} />
				<meta name="twitter:image" content={blog.image} />
			</Helmet>
			<div className="container" id="blogs">
				<div className="site-content">
					<div className="posts">
						<div
							className="post-content"
							data-aos="zoom-in"
							data-aos-delay="200"
						>
							<div className="post-title">
								<h1>{blog.title}</h1>
								<h3>
									<i className="fas fa-user text-gray">
										<FaUser />
									</i>
									&nbsp;Me&nbsp;&nbsp;
									<i className="fas fa-calendar-alt text-gray">
										<FaCalendar />
									</i>
									&nbsp;<Moment format="MMM DD, YYYY">{blog.date}</Moment>
								</h3>
								<div className="post-image">
									<div>
										<img src={blog.image} className="img" alt={blog.alt} />
									</div>
								</div>
							</div>
							<div className="blog-html">{ReactHtmlParser(blog.content)}</div>
							{/* Parsing HTML blog content */}
						</div>

						<Comments url={pathname} />
						<Loader />
					</div>
					<Sidebar
						categories={categories}
						blogs={filteredBlogs}
						future={blog.future}
					/>
					{/* Sidebar section populated with links to other blogs. */}
				</div>
			</div>
		</>
	);
};

export default Blog;
