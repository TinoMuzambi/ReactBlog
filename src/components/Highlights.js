import React, { Component, useEffect } from "react";
import Highlight from "./Highlight";
// import $ from "jquery";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

class Highlights extends Component {
	render() {
		// window.jQuery = $;
		// window.$ = $;
		// global.jQuery = $;

		return (
			<>
				<div className="blog" id="highlights">
					<div className="container">
						<h1 className="text-center">Highlights</h1>
						<div className="">{/* <Highlight /> */}</div>
					</div>
				</div>
			</>
		);
	}
}

export default Highlights;
