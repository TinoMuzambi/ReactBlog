import React, { Component } from "react";
import categories from "../data/categories";
import blogs from "../data/blogs";
import Blogs from "./Blogs";
import Sidebar from "../components/Sidebar";

class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.match.params.name, // Getting name from props to find right category to display.
			blogItems: blogs, // Set state to list of blogs.
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

	componentWillReceiveProps(nextProps) {
		// Ensure category content changes when url changes.
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
		const name = this.state.name; // Finding relevant category.
		const category = categories.find(
			(category) => category.name.toLowerCase() === name
		);
		document.title = category.name + " | Blog.TinoMuzambi"; // Update document title to reflect category.
		const filteredBlogs = this.state.blogItems // Getting list that doesn't include current category for other blogs section.
			.filter((eachItem) => {
				return eachItem["category"].toLowerCase().includes(name.toLowerCase());
			})
			.filter((eachItem) => {
				return !eachItem["future"] === true;
			});
		const sideBlogs = this.state.blogItems // Getting list that doesn't include current blog for sidebar section.
			.filter((eachItem) => {
				return (
					!eachItem["category"].toLowerCase().includes(name.toLowerCase()) &&
					!eachItem["future"] === true
				);
			})

			.slice(0, 3);
		return (
			<>
				<div className="container">
					<div class="site-content">
						<div class="posts">
							<h1>{category.name}</h1>
							{/* Only render component if there are blogs to show for category */}
							{filteredBlogs.length > 0 ? (
								<Blogs blogs={filteredBlogs} category={true} root={this} />
							) : (
								<h2>Nothing here yet...</h2>
							)}
						</div>
						<Sidebar blogs={sideBlogs} future={false} />{" "}
						{/* Sidebar section populated with links to other blogs. */}
					</div>
				</div>
			</>
		);
	}
}

export default Category;
