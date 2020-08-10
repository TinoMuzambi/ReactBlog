import React, { Component } from "react";

class Search extends Component {
	render() {
		return (
			<div className="search-field">
				<input
					type="text"
					id="searchBlogs"
					placeholder="Search Blogs"
					className="search-input"
					onChange={(e) => this.props.searchBlogs(e.target.value)}
				/>
			</div>
		);
	}
}

export default Search;
