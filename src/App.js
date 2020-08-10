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
import blogs from "./data/blogs";
import "./App.css";
import AOS from "aos";
import "./aos.css";
import ScrollToTop from "./components/ScrollToTop";

class App extends Component {
	componentDidMount() {
		AOS.init();
		document.title = "Blog.TinoMuzambi";
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
					<Navbar root={this} />
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
												<Blogs blogs={homeBlogs} category={false} root={this} />
											</section>
											<Sidebar blogs={filteredBlogs} future={true} />
										</div>
									</section>
								</div>
							)}
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
