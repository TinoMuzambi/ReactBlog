import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	withRouter,
	Link,
} from "react-router-dom";
import scrollToComponent from "react-scroll-to-component";
import { FaBars } from "react-icons/fa";
import SocialIcons from "./components/SocialIcons";
import About from "./components/About";
import Featured from "./components/Featured";
import Blogs from "./components/Blogs";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import Category from "./components/Category";
import blogs from "./data/blogs";
import "./App.css";
import AOS from "aos";
import "./aos.css";
import ScrollToTop from "./components/ScrollToTop";

class App extends Component {
	constructor(props) {
		super(props);
		this.toggleCollapse = this.toggleCollapse.bind(this);
	}

	componentDidMount() {
		AOS.init();
	}

	toggleCollapse() {
		const nav = document.querySelector("nav");
		nav.toggleAttribute("collapse");
	}

	render() {
		const filteredBlogs = blogs.filter((eachItem) => {
			return eachItem["future"] === true;
		});
		const homeBlogs = blogs.filter((eachItem) => {
			return eachItem["future"] === false;
		});
		return (
			<>
				<Router>
					<ScrollToTop />
					<nav className="nav" id="nav">
						<div className="nav-menu flex-row">
							<div className="nav-brand">
								<Link to="/" className="text-gray">
									Blog.TinoMuzambi
								</Link>
							</div>
							<div className="toggle-collapse">
								<div className="toggle-icons">
									<span className="fas fa-bars" onClick={this.toggleCollapse}>
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
											scrollToComponent(this.featured, {
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
										className="featured"
										ref={(section) => {
											this.featured = section;
										}}
									>
										<Featured />
									</section>
									<section className="container" id="blogs">
										<div className="site-content">
											<section
												className="blogs"
												ref={(section) => {
													this.blogs = section;
												}}
											>
												<Blogs blogs={homeBlogs} category={false} />
											</section>
											<Sidebar blogs={filteredBlogs} future={true} />
										</div>
									</section>
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
