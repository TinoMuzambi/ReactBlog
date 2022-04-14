import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Sidebar: React.FC<blokProps> = ({ blok }): JSX.Element => {
	console.log(blok);
	return (
		<aside className="sidebar">
			<div className="category">
				<DynamicComponent blok={blok.categories[0]} />
			</div>
			<div className="other-posts">
				<DynamicComponent blok={blok.other_blogs[0]} />
			</div>
		</aside>
	);
};
export default Sidebar;
