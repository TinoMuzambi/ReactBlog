import React, { Component } from "react";
import { Link } from "react-router-dom";
import blogs from "../data/blogs";
import img from "../assets/blog-images/me_crop.jpg";
// import $ from "jquery";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";

// window.jQuery = $;
// window.$ = $;
// global.jQuery = $;

class Highlight extends Component {
	render() {
		return (
			<>
				{blogs.map((highlight, key) => (
					<div
						className="blog-content"
						data-aos="fade-right"
						data-aos-delay="200"
						key={key}
					>
						<Link to={`/blogs/${highlight.title}`}>
							<img src={img} alt={highlight.alt} />
							<div className="blog-title">
								<h3>{highlight.title}</h3>
								<a href={`categories/${highlight.category}`}>
									<button className="btn btn-blog">{highlight.category}</button>
								</a>
								<span>{highlight.readTime}</span>
							</div>
						</Link>
					</div>
				))}
			</>
		);
	}
}

export default Highlight;
