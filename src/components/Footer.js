import React from "react";
import IG1 from "../assets/instagram/watch.JPG";
import IG2 from "../assets/instagram/closed_rose.jpg";
import IG3 from "../assets/instagram/sutherland.jpg";
import IG4 from "../assets/instagram/me_sutherland.jpg";
import IG5 from "../assets/instagram/me_selfie.jpg";
import IG6 from "../assets/instagram/me_sprinting.JPG";
import SocialIcons from "./SocialIcons";
import { FaArrowCircleUp, FaCopyright } from "react-icons/fa";

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
					<a
						href="https://bit.ly/TinoInstagram"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="flex-row">
							<img src={IG1} alt="insta1" />
							<img src={IG2} alt="insta2" />
							<img src={IG3} alt="insta3" />
						</div>
						<div className="flex-row">
							<img src={IG4} alt="insta4" />
							<img src={IG5} alt="insta5" />
							<img src={IG6} alt="insta6" />
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
					Made with HTML, CSS & JS.{" "}
					<i className="fas fa-copyright">
						<FaCopyright />
					</i>{" "}
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
