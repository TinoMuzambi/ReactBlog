import React, { Component } from "react";
import categories from "../data/categories";
import blogs from "../data/blogs";
import Blogs from "./Blogs";
import Sidebar from "./Sidebar";

class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.match.params.name,
		};
	}

	render() {
		const name = this.state.name;
		const category = categories.find(
			(category) => category.name.toLowerCase() === name
		);
		const filteredBlogs = blogs.filter((eachItem) => {
			return eachItem["category"].toLowerCase().includes(name.toLowerCase());
		});
		console.log(blogs);
		console.log(filteredBlogs);
		return (
			<>
				<div class="site-content">
					<div class="posts">
						<h1>{category.name}</h1>
						<Blogs blogs={filteredBlogs} />
					</div>
					<Sidebar blogs={blogs} />
				</div>
			</>
		);
	}
}

export default Category;
