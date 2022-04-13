import { blokProps } from "../interfaces";
import Placeholder from "./Placeholder";
import About from "./About";
import Image from "./Image";
import Featured from "./Featured";

const Components: any = {
	about: About,
	image: Image,
	featured: Featured,
};

const DynamicComponent: React.FC<blokProps> = ({ blok }): JSX.Element => {
	if (typeof Components[blok?.component] !== "undefined") {
		const Component = Components[blok?.component];

		return <Component blok={blok} />;
	}
	return <Placeholder componentName={blok?.component} />;
};

export default DynamicComponent;
