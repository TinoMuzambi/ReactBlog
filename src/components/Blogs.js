import React, { Component } from "react";
import {
	FaUser,
	FaCalendar,
	FaArrowRight,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import ReactHtmlParser from "react-html-parser";
import JwPagination from "jw-react-pagination";
import scrollToComponent from "react-scroll-to-component";

class Blogs extends Component {
	constructor(props) {
		super(props);

		this.handlePageChange = this.handlePageChange.bind(this);

		this.state = {
			blogItems: props.blogs,
			pageOfItems: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ pageOfItems: nextProps.blogs });
	}

	handlePageChange(pageOfItems) {
		this.setState({ pageOfItems });
		scrollToComponent(this.props.root.blogs, {
			offset: 0,
			align: "top",
			duration: 1500,
		});
	}

	customStyles = {
		ul: {
			display: "inline-block",
			paddingBottom: "5rem",
		},
	};

	customLabels = {
		previous: <FaChevronLeft />,
		next: <FaChevronRight />,
	};

	render() {
		return (
			<>
				<div className="posts">
					{this.props.category ? "" : <h1>Blogs</h1>}
					{this.state.pageOfItems.map((blog, key) => (
						<div
							className="post-content"
							data-aos="zoom-in"
							data-aos-delay="200"
							key={key}
						>
							<div className="post-image">
								<div>
									<Link to={`/blogs/${blog.url}`}>
										<img src={blog.image} className="img" alt="shower" />
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
										<Moment format="MMMM DD, YYYY">{blog.date}</Moment>
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
									key === this.props.blogs.length - 1 ? "is-hidden" : ""
								}`}
							></hr>
						</div>
					))}
					<div className="text-center">
						<JwPagination
							items={this.state.blogItems}
							onChangePage={this.handlePageChange}
							pageSize={4}
							styles={this.customStyles}
							labels={this.customLabels}
						/>
					</div>
				</div>
			</>
		);
	}
}

export default Blogs;
