import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Categories: React.FC<blokProps> = ({ blok }) => {
	return (
		<>
			<h2>Categories</h2>
			<ul className="category-list">
				{blok.categories.map((category: any, key: number) => (
					<DynamicComponent blok={category} key={key} />
				))}
			</ul>
		</>
	);
};
export default Categories;
