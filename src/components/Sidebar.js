import React from "react";
import Categories from "./Categories";
import SideBlog from "./SideBlog";

const Sidebar = ({ blogs, future }) => (
	<>
		<aside className="sidebar">
			<div className="category">
				<Categories />
			</div>
			<div className="other-posts">
				<SideBlog blogs={blogs} future={future} />
			</div>
		</aside>
	</>
);

export default Sidebar;
