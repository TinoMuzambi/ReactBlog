import React from "react";
import img from "../assets/blog-images/me_crop.jpg";
import SocialIcons from "./SocialIcons";

const Footer = () => (
	<>
		<footer class="footer" id="contact-me">
			<div class="container">
				<div class="about-us" data-aos="fade-right" data-aos-delay="200">
					<h2>About me</h2>
					<p>
						I'm Tino. An avid techie and software developer turned blogger based
						in Cape Town, South Africa.
					</p>
				</div>
				<div class="instagram" data-aos="fade-left" data-aos-delay="200">
					<h2>Instagram</h2>
					<a href="https://bit.ly/TinoInstagram" target="_blank">
						<div class="flex-row">
							<img src={img} alt="insta1" />
							<img src={img} alt="insta2" />
							<img src={img} alt="insta3" />
						</div>
						<div class="flex-row">
							<img src={img} alt="insta4" />
							<img src={img} alt="insta5" />
							<img src={img} alt="insta6" />
						</div>
					</a>
				</div>
				<div class="follow" data-aos="fade-left" data-aos-delay="200">
					<h2>Follow me</h2>
					<p>Hit Me Up</p>
					<SocialIcons />
				</div>
			</div>
			<div class="rights flex-row">
				<h4 class="text-gray">
					Made with HTML, CSS & JS. <i class="fas fa-copyright"></i> Copyright
					Tino Muzambi 2020
				</h4>
			</div>
			<div class="move-up">
				<a href="#">
					<span>
						<i class="fas fa-arrow-circle-up fa-2x"></i>
					</span>
				</a>
			</div>
		</footer>
	</>
);

export default Footer;
