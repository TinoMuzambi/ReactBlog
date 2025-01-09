import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const SocialIcons: React.FC<blokProps> = ({ blok }) => {
	return (
		<div className="social text-gray">
			{blok.icons.map((icon: any, key: number) => (
				<DynamicComponent blok={icon} key={key} />
			))}
		</div>
	);
};
export default SocialIcons;
