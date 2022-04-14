import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Sidebar: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<aside className="sidebar">
			<div className="category">
				<DynamicComponent blok={blok.categories} />
			</div>
			<div className="other-posts">
				<DynamicComponent blok={blok.other_blogs} />
			</div>
		</aside>
	);
};
export default Sidebar;
