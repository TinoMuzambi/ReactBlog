import React from "react";
import Highlight from "./Highlight";
import blogs from "../data/blogs";
import $ from "jquery";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css"; //Allows for server-side rendering.

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Highlights = () => (
	<>
		<div className="blog" id="highlights">
			<div className="container">
				<h1 className="text-align: center">Highlights</h1>
				<OwlCarousel className="owl-carousel owl-theme blog-post">
					<Highlight highlights={blogs} />
					<div className="owl-navigation">
						<span className="owl-nav-prev">
							<i className="fas fa-long-arrow-alt-left"></i>
						</span>
						<span className="owl-nav-next">
							<i className="fas fa-long-arrow-alt-right"></i>
						</span>
					</div>
				</OwlCarousel>
			</div>
		</div>
	</>
);

export default Highlights;
