import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import scrollToComponent from "react-scroll-to-component";
import { FaBars } from "react-icons/fa";
import SocialIcons from "./components/SocialIcons";
import About from "./components/About";
import Highlights from "./components/Highlights";
import Blogs from "./components/Blogs";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import Category from "./components/Category";
import blogs from "./data/blogs";
import "./App.css";
import AOS from "aos";

class App extends Component {
	componentDidMount() {
		AOS.init();
		let owl_carousel = require("owl.carousel");
		window.fn = owl_carousel;
	}

	render() {
		return (
			<>
				<Router>
					<nav className="nav">
						<div className="nav-menu flex-row">
							<div className="nav-brand">
								<a href="https://blog.tinomuzambi.com" className="text-gray">
									Blog.TinoMuzambi
								</a>
							</div>
							<div className="toggle-collapse">
								<div className="toggle-icons">
									<span className="fas fa-bars">
										<FaBars />
									</span>
								</div>
							</div>
							<div>
								<ul className="nav-items">
									<li
										className="nav-link"
										onClick={() =>
											scrollToComponent(this.about, {
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
											scrollToComponent(this.highlights, {
												offset: 0,
												align: "top",
												duration: 1500,
											})
										}
									>
										Highlights
									</li>
									<li
										className="nav-link"
										onClick={() =>
											scrollToComponent(this.blogs, {
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
											scrollToComponent(this.footer, {
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
					<Switch>
						<Route
							path="/"
							render={(props) => (
								<div>
									<section
										className="about"
										ref={(section) => {
											this.about = section;
										}}
									>
										<About />
									</section>
									<section
										className="highlights"
										ref={(section) => {
											this.highlights = section;
										}}
									>
										<Highlights />
									</section>
									<div className="site-content">
										<section
											className="blogs"
											ref={(section) => {
												this.blogs = section;
											}}
										>
											<Blogs blogs={blogs} />
										</section>
										<Sidebar />
									</div>
								</div>
							)}
							exact
						/>
						<Route path="/blogs/:name" component={Blog} />
						<Route path="/categories/:name" component={Category} />
					</Switch>
					<section
						className="footer"
						ref={(section) => {
							this.footer = section;
						}}
					>
						<Footer />
					</section>
				</Router>
			</>
		);
	}
}

export default App;
