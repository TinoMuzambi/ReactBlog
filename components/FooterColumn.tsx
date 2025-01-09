import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const FooterColumn: React.FC<blokProps> = ({ blok }) => {
	return (
		<div className={blok.classname}>
			<h2>{blok.title}</h2>
			{blok.content.map((item: any, key: number) => (
				<DynamicComponent blok={item} key={key} />
			))}
		</div>
	);
};
export default FooterColumn;
