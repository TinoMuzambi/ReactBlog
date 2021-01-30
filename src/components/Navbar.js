import React from "react";
import scrollToComponent from "react-scroll-to-component";
import { Link, useLocation } from "react-router-dom";
import { withRouter } from "react-router";
import { FaBars } from "react-icons/fa";
import SocialIcons from "./SocialIcons";

const Navbar = ({ root }) => {
	const toggleCollapse = () => {
		// Toggle collapse class on navbar.
		const nav = document.querySelector(".nav");
		nav.classList.toggle("collapse");
	};

	const location = useLocation();

	return (
		<>
			<nav className="nav" id="nav">
				<div className="nav-menu flex-row">
					<div className="nav-brand">
						<Link to="/" className="text-gray">
							Blog.TinoMuzambi
						</Link>
					</div>
					<div className="toggle-collapse">
						<div className="toggle-icons">
							<span className="fas fa-bars" onClick={toggleCollapse}>
								<FaBars />
							</span>
						</div>
					</div>
					<div>
						<ul className="nav-items">
							{/* Either scroll or go home depending on location. */}
							{location.pathname === "/" ? (
								<li
									className="nav-link"
									onClick={() =>
										scrollToComponent(root.about, {
											offset: 0,
											align: "top",
											duration: 1500,
										})
									}
								>
									Home
								</li>
							) : (
								<Link to="/">
									<li className="nav-link">Home</li>
								</Link>
							)}
							{/* Conditionally render element based on location */}
							{location.pathname === "/" ? (
								<li
									className="nav-link"
									onClick={() =>
										scrollToComponent(root.featured, {
											offset: 0,
											align: "top",
											duration: 1500,
										})
									}
								>
									Featured
								</li>
							) : (
								""
							)}
							{/* Conditionally render element based on location */}
							{location.pathname === "/" ? (
								<li
									className="nav-link"
									onClick={() =>
										scrollToComponent(root.blogs, {
											offset: 0,
											align: "top",
											duration: 1500,
										})
									}
								>
									Blogs
								</li>
							) : (
								""
							)}
							<li
								className="nav-link"
								onClick={() =>
									scrollToComponent(root.footer, {
										offset: 0,
										align: "top",
										duration: 1500,
									})
								}
							>
								Socials
							</li>
						</ul>
					</div>
					<SocialIcons /> {/* Social Icons section */}
				</div>
			</nav>
		</>
	);
};

export default withRouter(Navbar);
