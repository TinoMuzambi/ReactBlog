import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const ThreeItemGrid: React.FC<blokProps> = ({ blok }) => {
	return (
		<>
			{blok.columns.map((blok: any, key: any) => (
				<DynamicComponent key={key} blok={blok} />
			))}
		</>
	);
};

export default ThreeItemGrid;
