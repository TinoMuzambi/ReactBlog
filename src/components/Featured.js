import React, { Component } from "react";
import Iframe from "react-iframe";
import item from "../data/featured-item";
import Moment from "react-moment";
import ReactHtmlParser from "react-html-parser";

class Featured extends Component {
	render() {
		return (
			<>
				<div className="container">
					<div
						className="featured"
						id="featured"
						data-aos="zoom-in-up"
						data-aos-delay="200"
					>
						<h1 className="featured-title text-center">Featured item</h1>
						<div className="item-container">
							<Iframe url={item.url} id={0} className="item" allowFullScreen />
						</div>
						<h2>{item.title}</h2>
						<h3>
							Updated on <Moment format="MMM DD, YYYY">{item.date}</Moment>
						</h3>
						<p>{ReactHtmlParser(item.description)}</p>{" "}
						{/* Parse html description. */}
					</div>
				</div>
			</>
		);
	}
}

export default Featured;
