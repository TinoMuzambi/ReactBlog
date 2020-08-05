import React from "react";
import img from "../assets/blog-images/me_crop.jpg";
import SocialIcons from "./SocialIcons";
import { FaArrowCircleUp } from "react-icons/fa";

const Footer = () => (
	<>
		<footer className="footer" id="contact-me">
			<div className="container">
				<div className="about-us" data-aos="fade-right" data-aos-delay="200">
					<h2>About me</h2>
					<p>
						I'm Tino. An avid techie and software developer turned blogger based
						in Cape Town, South Africa.
					</p>
				</div>
				<div className="instagram" data-aos="fade-left" data-aos-delay="200">
					<h2>Instagram</h2>
					<a href="https://bit.ly/TinoInstagram" target="_blank">
						<div className="flex-row">
							<img src={img} alt="insta1" />
							<img src={img} alt="insta2" />
							<img src={img} alt="insta3" />
						</div>
						<div className="flex-row">
							<img src={img} alt="insta4" />
							<img src={img} alt="insta5" />
							<img src={img} alt="insta6" />
						</div>
					</a>
				</div>
				<div className="follow" data-aos="fade-left" data-aos-delay="200">
					<h2>Follow me</h2>
					<p>Hit Me Up</p>
					<SocialIcons />
				</div>
			</div>
			<div className="rights flex-row">
				<h4 className="text-gray">
					Made with HTML, CSS & JS. <i className="fas fa-copyright"></i>{" "}
					Copyright Tino Muzambi 2020
				</h4>
			</div>
			<div className="move-up">
				<a href="#">
					<span>
						<i className="fas fa-arrow-circle-up fa-2x">
							<FaArrowCircleUp />
						</i>
					</span>
				</a>
			</div>
		</footer>
	</>
);

export default Footer;
