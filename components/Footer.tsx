import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Footer: React.FC<blokProps> = ({ blok }): JSX.Element => {
	console.log(blok);
	return (
		<footer className="footer">
			<div className="container">
				<DynamicComponent blok={blok.grid[0]} />
			</div>
			<div className="rights flex-row text-center">
				<h4 className="text-gray">{blok.copy}</h4>
			</div>
		</footer>
	);
};
export default Footer;
