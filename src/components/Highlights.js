import React from "react";
import Highlight from "./Highlight";
import blogs from "../data/blogs";
import $ from "jquery";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const options = {
	autoplay: false,
};

const Highlights = () => (
	<>
		<div className="blog" id="highlights">
			<div className="container">
				<h1 className="text-center">Highlights</h1>
				<OwlCarousel
					className="owl-carousel owl-theme blog-post"
					options={options}
				>
					<Highlight highlights={blogs} />
					<div className="owl-navigation">
						<span className="owl-nav-prev">
							<span className="fas fa-long-arrow-alt-left">
								<FaArrowLeft />
							</span>
						</span>
						<span className="owl-nav-next">
							<span className="fas fa-long-arrow-alt-right">
								<FaArrowRight />
							</span>
						</span>
					</div>
				</OwlCarousel>
			</div>
		</div>
	</>
);

export default Highlights;
