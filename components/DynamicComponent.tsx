import Placeholder from "./Placeholder";
import { blokProps } from "../interfaces";

const Components: any = {};

const DynamicComponent: React.FC<blokProps> = ({ blok }): JSX.Element => {
	if (typeof Components[blok?.component] !== "undefined") {
		const Component = Components[blok?.component];

		return <Component blok={blok} />;
	}
	return <Placeholder componentName={blok?.component} />;
};

export default DynamicComponent;
