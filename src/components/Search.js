import React from "react";

const Search = () => (
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

export default Search;
