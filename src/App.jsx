import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import { RiLightbulbFlashLine, RiLightbulbFill } from "react-icons/ri";
import AOS from "aos";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Featured from "./components/Featured";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";
import ScrollToTop from "./components/ScrollToTop";
import NotFoundPage from "./pages/NotFoundPage";
import Preload from "./pages/Preload";
import Blogs from "./pages/Blogs";
import OpenSearch from "./pages/OpenSearch";
import { getBlogs, getCategories, getFeatured } from "./utils/fetch";
import { executeScroll } from "./utils/helpers";
import "./css/App.min.css";

const App = () => {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);
	const [dark, setDark] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [blogs, setBlogs] = useState([]);
	const [categories, setCategories] = useState([]);
	const [featuredItem, setFeaturedItem] = useState({});

	const about = useRef(null);
	const featured = useRef(null);
	const blogsRef = useRef(null);
	const footer = useRef(null);
	const location = useLocation();

	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.
	}, []);

	useEffect(() => {
		const lsDark = JSON.parse(localStorage.getItem("blogtino-dark"));
		if (lsDark === true || lsDark === false) {
			setDark(lsDark);
			document.body.classList.remove("dark");

			lsDark
				? document.body.classList.add("dark")
				: document.body.classList.remove("dark");
		}
	}, []);

	useEffect(() => {
		if (!fetching) {
			const nav = document.querySelector(".nav"); // Remove collapse from nav to hide it.
			nav.classList.remove("collapse");
			nav.classList.remove("collapse-sm");
		}
	}, [location.pathname, fetching]);

	useEffect(() => {
		const fromOpenSearch = location.state?.fromOpenSearch;
		fromOpenSearch && executeScroll(blogsRef);
	}, [location.state]);

	useEffect(() => {
		const getData = async () => {
			const dataBlogs = await getBlogs();
			const dataCategories = await getCategories();
			const dataFeatured = await getFeatured();
			setBlogs(dataBlogs);
			setCategories(dataCategories);
			setFeaturedItem(dataFeatured);
			setFetching(false);
		};
		getData();
	}, []);

	if (fetching) {
		/* Preloader for showing before page loads. */
		return <Preload />;
	}

	const searchBlogs = (query) => {
		// Search by updating queryText state.
		setQueryText(query);
		query ? setSearching(true) : setSearching(false);
	};

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
				.includes(queryText.toLowerCase()) ||
			eachItem["category"] // Search in category.
				.toLowerCase()
				.includes(queryText.toLowerCase()) ||
			eachItem["content"] // Search in content.
				.toLowerCase()
				.includes(queryText.toLowerCase())
		);
	});
	const Blog = lazy(() => import("./pages/Blog"));
	const Category = lazy(() => import("./pages/Category"));
	const Footer = lazy(() => import("./components/Footer"));
	return (
		<>
			<ScrollToTop /> {/* Scroll to top on page load. */}
			<Navbar
				about={about}
				featured={featured}
				blogsRef={blogsRef}
				footer={footer}
			/>
			<button
				className="dark-toggle"
				data-mode={dark ? "Switch to light mode" : "Switch to dark mode"}
				onClick={() => {
					setDark(!dark);

					document.body.classList.remove("dark");

					!dark
						? document.body.classList.add("dark")
						: document.body.classList.remove("dark");

					localStorage.setItem("blogtino-dark", JSON.stringify(!dark));
				}}
			>
				{dark ? (
					<RiLightbulbFlashLine className="icon" />
				) : (
					<RiLightbulbFill className="icon" />
				)}
			</button>
			{/* Navbar - gets ref to this for scrolling to anchors. */}
			<>
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<>
								<Helmet>
									<title>Blog.TinoMuzambi</title>
									<meta name="description" content="Blog.TinoMuzambi" />

									{/* <!-- Google / Search Engine Tags --> */}
									<meta itemprop="name" content="Blog.TinoMuzambi" />
									<meta itemprop="description" content="Blog.TinoMuzambi" />
									<meta itemprop="image" content="/logo512.png" />

									{/* <!-- Facebook Meta Tags --> */}
									<meta
										property="og:url"
										content="https://blog.tinomuzambi.com"
									/>
									<meta property="og:type" content="website" />
									<meta property="og:title" content="Blog.TinoMuzambi" />
									<meta property="og:description" content="Blog.TinoMuzambi" />
									<meta property="og:image" content="/logo512.png" />

									{/* <!-- Twitter Meta Tags --> */}
									<meta name="twitter:card" content="summary_large_image" />
									<meta name="twitter:title" content="Blog.TinoMuzambi" />
									<meta name="twitter:description" content="Blog.TinoMuzambi" />
									<meta name="twitter:image" content="/logo512.png" />
								</Helmet>
								<section className="about" ref={about}>
									<About /> {/* About section */}
								</section>
								<section className="featured" ref={featured}>
									<Featured item={featuredItem} /> {/* Featured section */}
								</section>
								<div className="search-wrapper">
									<Search query={queryText} searchBlogs={searchBlogs} />
									{/* Search box */}
								</div>
								<section className="container" id="blogs">
									<div className="site-content">
										<section className="blogs" ref={blogsRef}>
											{blogs && (
												<Blogs
													blogs={homeBlogs}
													category={false}
													blogsRef={blogsRef}
													search={searching}
												/>
											)}
											{/* Blogs section - pass list of blogs, false for category
												and ref to this for scrolling to anchors */}
										</section>
										<Sidebar
											categories={categories}
											blogs={filteredBlogs}
											future={true}
										/>
										{/* Sidebar section - pass list of blogs, true for future to signal
											showing future blogs.*/}
									</div>
								</section>
							</>
						)}
					/>
					{/* Lazy loading components that don't need to be rendered immediately. */}
					<Suspense
						fallback={
							<div className="icon-wrapper">
								<AiOutlineReload className="icon" />
							</div>
						}
					>
						<Route
							path="/blogs/:name"
							render={() => <Blog blogs={blogs} categories={categories} />}
						/>
						{/* Blog route for displaying blog content. */}
						<Route
							path="/categories/:name"
							render={() => <Category categories={categories} blogs={blogs} />}
						/>
						{/* Category route for displaying per category blogs. */}
						<Route
							exact
							path="/search/:query"
							render={() => (
								<OpenSearch blogsRef={blogsRef} setQueryText={setQueryText} />
							)}
						/>
						{/* OpenSearch route for searching site.*/}
					</Suspense>
					<Route component={NotFoundPage} />
				</Switch>
				<Suspense
					fallback={
						<div className="icon-wrapper">
							<AiOutlineReload className="icon" />
						</div>
					}
				>
					<section className="footer" ref={footer}>
						<Footer /> {/* Footer section */}
					</section>
				</Suspense>
			</>
		</>
	);
};

export default App;
