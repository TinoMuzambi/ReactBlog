import { FaArrowCircleUp } from "react-icons/fa";

import { blokProps, MyCustomCSS } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Footer: React.FC<blokProps> = ({ blok }): JSX.Element => {
	const scrollTop = () => {
		// Scroll to top handler.
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	return (
		<section
			className="footer"
			id="footer"
			style={
				{
					"--bg-image":
						`url(${blok.background_image[0].image.filename})` as string,
				} as MyCustomCSS
			}
		>
			<footer className="footer">
				<div className="container">
					<DynamicComponent blok={blok.grid[0]} />
				</div>
				<div className="rights flex-row text-center">
					<h4 className="text-gray">{blok.copy}</h4>
				</div>
				<div className="move-up">
					<span onClick={scrollTop}>
						<i className="fas fa-arrow-circle-up fa-2x">
							<FaArrowCircleUp />
						</i>
					</span>
				</div>
			</footer>
		</section>
	);
};
export default Footer;
