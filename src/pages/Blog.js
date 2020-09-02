import React, { Component } from "react";
import blogs from "../data/blogs";
import Sidebar from "../components/Sidebar";
import { FaUser, FaCalendar } from "react-icons/fa";
import Moment from "react-moment";
import Disqus from "../components/Disqus";
import ReactHtmlParser from "react-html-parser";

class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.match.params.name, // Getting name from props to find right blog to display.
		};
	}

	componentDidMount() {
		const nav = document.querySelector(".nav"); // Remove collapse from nav to hide it.
		nav.classList.remove("collapse");
	}

	componentWillUnmount() {
		const nav = document.querySelector(".nav"); // Remove collapse from nav to hide it.
		nav.classList.remove("collapse");
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// Ensure blog content changes when url changes.
		if (this.props.match.url !== nextProps.match.url) {
			return this.setState({
				name: nextProps.match.params.name,
			});
		} else {
			this.setState({
				name: this.props.match.params.name,
			});
		}
	}

	render() {
		const title = this.state.name; // Finding relevant blog.
		const blog = blogs.find((blog) => blog.url === title);
		document.title = blog.title + " | Blog.TinoMuzambi"; // Update document title to reflect blog.
		const filteredBlogs = blogs // Getting list that doesn't include current blog for other blogs section.
			.filter((eachItem) => {
				return !eachItem["url"].toLowerCase().includes(title.toLowerCase());
			})
			.slice(0, 3);
		return (
			<>
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
								<div className="blog-html">{ReactHtmlParser(blog.content)}</div>{" "}
								{/* Parsing HTML blog content */}
							</div>

							{/* <!---------------------------------  Disqus Comments Plugin  -------------------------------------- --> */}

							<Disqus
								title={blog.title}
								url={blog.disqusURL}
								identifier={blog.disqusIdentifier}
								src={blog.disqusSrc}
							/>

							{/* <!--------------X------------------  Disqus Comments Plugin  ------------------------X------------- --> */}
						</div>
						<Sidebar blogs={filteredBlogs} future={false} />{" "}
						{/* Sidebar section populated with links to other blogs. */}
					</div>
				</div>
			</>
		);
	}
}

export default Blog;
