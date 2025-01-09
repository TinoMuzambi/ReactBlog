import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Sidebar: React.FC<blokProps> = ({ blok }) => {
	return (
		<aside className="sidebar">
			<div className="category">
				<DynamicComponent
					blok={{
						categories: blok.categories.map(
							(category: any) => category.content
						),
						component: "categories",
					}}
				/>
			</div>
			<div className="other-posts">
				<h2>{blok.type === "future" ? "Future" : "Other"} Blogs</h2>
				{blok.other_blogs
					.sort((a: any, b: any) =>
						b.content?.date.localeCompare(a.content?.date)
					)
					.map((blog: any, key: number) => (
						<DynamicComponent
							blok={{
								...blog.content,
								component: "sideblog",
							}}
							key={key}
						/>
					))}
			</div>
		</aside>
	);
};
export default Sidebar;
