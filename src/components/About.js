import React from "react";
import Me from "../assets/blog-images/me.jpg";

const About = () => (
	<>
		<section className="site-title">
			<div className="site-background" data-aos="fade-up" data-aos-delay="100">
				<img src={Me} alt="me" />
				<h1>Tino Muzambi</h1>
				<h2>
					<s>Software Developer</s>&nbsp;Blogger
				</h2>
			</div>
		</section>
	</>
);

export default About;
