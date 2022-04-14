import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const ThreeItemGrid: React.FC<blokProps> = ({ blok }) => {
	return (
		<section className="three-grid">
			{blok.columns.map((blok: any, key: any) => (
				<DynamicComponent key={key} blok={blok} />
			))}
		</section>
	);
};

export default ThreeItemGrid;
