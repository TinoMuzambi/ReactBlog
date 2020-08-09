import React from "react";
import scrollToComponent from "react-scroll-to-component";
import { FaBars } from "react-icons/fa";
import SocialIcons from "./SocialIcons";
import { Link } from "react-router-dom";

const toggleCollapse = () => {
	const nav = document.querySelector(".nav");
	nav.classList.toggle("collapse");
};

const Navbar = ({ root }) => (
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
							Contact
						</li>
					</ul>
				</div>
				<SocialIcons />
			</div>
		</nav>
	</>
);

export default Navbar;
