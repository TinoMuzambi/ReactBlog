import React, { Component } from "react";
import Iframe from "react-iframe";
import video from "../data/featured-video";
import Moment from "react-moment";

class Featured extends Component {
	render() {
		return (
			<>
				<div className="container">
					<div className="featured" id="featured">
						<h1 className="featured-title">Featured Video</h1>
						<div className="video-container">
							<Iframe
								url={video[0].url}
								id={0}
								className="video"
								allowFullScreen
							/>
						</div>

						<h2>{video[0].title}</h2>
						<h3>
							Updated on: <Moment format="MMM DD, YYYY">{video.date}</Moment>
						</h3>
						<p>{video[0].description}</p>
					</div>
				</div>
			</>
		);
	}
}

export default Featured;
