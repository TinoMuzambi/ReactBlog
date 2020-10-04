import React, { Component } from "react";
import ReactPlayer from "react-player/youtube";
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
						<h1 className="featured-title text-center">Featured Item</h1>
						<div className="item-container">
							{/* <ReactPlayer
								url={item.url}
								id={0}
								className="item"
								width="100%"
								height="100%"
								controls="true"
							/> */}
							<img
								src="https://img.cinemablend.com/filter:scale/quill/f/5/2/7/f/8/f527f8e67ac1c1b93e2a05bcc70f3bed59f51d2e.jpg?mw=600"
								alt="social dilemma"
								className="item"
							/>
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
