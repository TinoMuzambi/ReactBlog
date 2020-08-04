import React from "react";
import Categories from "./Categories";
import SideBlog from "./SideBlog";

const Sidebar = () => (
	<>
		<aside className="sidebar">
			<div className="category">
				<Categories />
			</div>
			<div className="other-posts">
				<SideBlog />
			</div>
		</aside>
	</>
);

export default Sidebar;
