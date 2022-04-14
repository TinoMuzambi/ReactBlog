import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Sidebar: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<aside className="sidebar">
			<div className="category">
				<DynamicComponent blok={blok.categories[0]} />
			</div>
			<div className="other-posts">
				<h2>{blok.type === "future" ? "Future" : "Other"} Blogs</h2>
				{blok.other_blogs.map((blog: any, key: number) => (
					<DynamicComponent blok={blog} key={key} />
				))}
			</div>
		</aside>
	);
};
export default Sidebar;
