import React from "react";
import Categories from "./Categories";
import SideBlog from "./SideBlog";

const Sidebar = ({ blogs }) => (
	<>
		<aside className="sidebar">
			<div className="category">
				<Categories />
			</div>
			<div className="other-posts">
				<SideBlog blogs={blogs} />
			</div>
		</aside>
	</>
);

export default Sidebar;
