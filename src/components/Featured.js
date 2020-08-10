import React, { Component } from "react";
import Iframe from "react-iframe";
import video from "../data/featured-video";
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
						<h1 className="featured-title text-center">Featured Video</h1>
						<div className="video-container">
							<Iframe
								url={video.url}
								id={0}
								className="video"
								allowFullScreen
							/>
						</div>

						<h2>{video.title}</h2>
						<h3>
							Updated on <Moment format="MMM DD, YYYY">{video.date}</Moment>
						</h3>
						<p>{ReactHtmlParser(video.description)}</p>
					</div>
				</div>
			</>
		);
	}
}

export default Featured;
