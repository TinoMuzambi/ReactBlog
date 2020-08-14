import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Featured from "./components/Featured";
import Blogs from "./components/Blogs";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import Category from "./components/Category";
import Preload from "./components/Preload";
import Search from "./components/Search";
import NotFoundPage from "./components/NotFoundPage";
import blogs from "./data/blogs";
import "./App.css";
import AOS from "aos";
import "./aos.css";
import ScrollToTop from "./components/ScrollToTop";

window.addEventListener("load", () => {
	// Get rid of preloader once everything's loaded
	const preload = document.querySelector(".preload");
	preload.classList.add("preload-finish");
});

class App extends Component {
	constructor() {
		super();

		this.state = {
			queryText: "", // Query text for searching.
		};

		this.searchBlogs = this.searchBlogs.bind(this); // Binding search method.
	}

	searchBlogs(query) {
		// Search by updating queryText state.
		this.setState({ queryText: query });
	}

	componentDidMount() {
		AOS.init(); // Initialise animate on scroll library.
		document.title = "Blog.TinoMuzambi";

		const preload = document.querySelector(".preload"); // Set timeout for showing preloader.
		const timeoutID = setTimeout(function () {
			preload.classList.add("preload-finish");
			clearTimeout(timeoutID);
		}, 7000);
	}

	render() {
		const filteredBlogs = blogs.filter((eachItem) => {
			// Only get future blogs for sidebar.
			return eachItem["future"] === true;
		});

		let homeBlogs = blogs.filter((eachItem) => {
			// Only get published blogs for main content.
			return eachItem["future"] === false;
		});

		homeBlogs = homeBlogs.filter((eachItem) => {
			// Only display blogs matching search.
			return (
				eachItem["title"] // Search in title.
					.toLowerCase()
					.includes(this.state.queryText.toLowerCase()) ||
				eachItem["category"] // Search in category.
					.toLowerCase()
					.includes(this.state.queryText.toLowerCase()) ||
				eachItem["content"] // Search in content.
					.toLowerCase()
					.includes(this.state.queryText.toLowerCase())
			);
		});
		return (
			<>
				<Router>
					<ScrollToTop /> {/* Scroll to top on page load. */}
					<Preload /> {/* Preloader for showing before page loads. */}
					<Navbar root={this} />
					{/* Navbar - gets ref to this for scrolling to anchors. */}
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => (
								<div>
									<section
										className="about"
										ref={(section) => {
											this.about = section;
										}}
									>
										<About /> {/* About section */}
									</section>
									<section
										className="featured"
										ref={(section) => {
											this.featured = section;
										}}
									>
										<Featured /> {/* Featured section */}
									</section>
									<div className="search-wrapper">
										<Search searchBlogs={this.searchBlogs} /> {/* Search box */}
									</div>
									<section className="container" id="blogs">
										<div className="site-content">
											<section
												className="blogs"
												ref={(section) => {
													this.blogs = section;
												}}
											>
												<Blogs blogs={homeBlogs} category={false} root={this} />{" "}
												{/* Blogs section - pass list of blogs, false for category
												and ref to this for scrolling to anchors */}
											</section>
											<Sidebar blogs={filteredBlogs} future={true} />{" "}
											{/* Sidebar section - pass list of blogs, true for future to signal
											showing future blogs.*/}
										</div>
									</section>
								</div>
							)}
						/>
						<Route path="/blogs/:name" component={Blog} />{" "}
						{/* Blog route for displaying blog content. */}
						<Route path="/categories/:name" component={Category} />{" "}
						{/* Category route for displaying per category blogs. */}
						<Route component={NotFoundPage} />
					</Switch>
					<section
						className="footer"
						ref={(section) => {
							this.footer = section;
						}}
					>
						<Footer /> {/* Footer section */}
					</section>
				</Router>
			</>
		);
	}
}

export default App;
