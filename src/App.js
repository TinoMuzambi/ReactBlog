import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Featured from "./components/Featured";
import Blogs from "./pages/Blogs";
import Sidebar from "./components/Sidebar";
import Preload from "./pages/Preload";
import NotFoundPage from "./pages/NotFoundPage";
import Search from "./components/Search";
import { AiOutlineReload } from "react-icons/ai";
import "./css/App.min.css";
import AOS from "aos";
import ScrollToTop from "./components/ScrollToTop";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import OpenSearch from "./pages/OpenSearch";
import StoryblokClient from "storyblok-js-client";

const App = () => {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [blogs, setBlogs] = useState([]);
	const [categories, setCategories] = useState([]);

	const about = useRef(null);
	const featured = useRef(null);
	const blogsRef = useRef(null);
	const footer = useRef(null);
	const location = useLocation();

	const executeScroll = () =>
		blogsRef?.current?.scrollIntoView({ behavior: "smooth" });

	const searchBlogs = (query) => {
		// Search by updating queryText state.
		setQueryText(query);
		query ? setSearching(true) : setSearching(false);
	};

	const titleCase = (str) => {
		str = str.toLowerCase().split(" ");
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		}
		return str.join(" ");
	};

	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.

		const preload = document.querySelector(".preload"); // Set timeout for showing preloader.

		window.addEventListener("load", () => {
			// Get rid of preloader once everything's loaded
			!fetching && preload.classList.add("finish");
		});

		return () => {
			window.removeEventListener("load", () => {
				// Get rid of preloader once everything's loaded
				!fetching && preload.classList.add("finish");
			});
		};
	}, [fetching]);

	useEffect(() => {
		const nav = document.querySelector(".nav"); // Remove collapse from nav to hide it.
		nav.classList.remove("collapse");
		nav.classList.remove("collapse-sm");
	}, [location.pathname]);

	useEffect(() => {
		const fromOpenSearch = location.state?.fromOpenSearch;
		fromOpenSearch && executeScroll();
	}, [location.state]);

	useEffect(() => {
		// const BASE_URL = "https://api.storyblok.com/v1/cdn";
		const Storyblok = new StoryblokClient({
			accessToken: process.env.REACT_APP_STORYBLOK_KEY,
			cache: {
				clear: "auto",
				type: "memory",
			},
		});
		const getBlogs = () => {
			Storyblok.get("cdn/stories?starts_with=blogs/", {
				sort_by: "content.date:desc",
			})
				.then((response) => {
					const strictlyBlogs = response.data.stories;
					const prettyBlogs = strictlyBlogs.map((blog) => ({
						category: titleCase(blog.content.category.cached_url.substring(11)),
						content: blog.content.content,
						date: blog.content.date,
						disqusIdentifier: blog.content.disqusIdentifier,
						disqusShortname: blog.content.disqusShortname,
						disqusSrc: blog.content.disqusSrc,
						disqusURL: blog.content.disqusURL,
						future: blog.content.future,
						image: blog.content.media.filename,
						alt: blog.content.media.alt,
						readTime: blog.content.readTime,
						title: blog.content.title,
						url: blog.content.url,
						id: blog.content._uid,
					}));
					console.log(prettyBlogs);
					setBlogs(prettyBlogs);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		const getCategories = () => {
			Storyblok.get("cdn/stories?starts_with=categories/", {})
				.then((response) => {
					const strictlyCats = response.data.stories;
					const prettyCats = strictlyCats.map((cat) => ({
						count: cat.content.count,
						alt: cat.content.image.alt,
						image: cat.content.image.filename,
						name: cat.content.name,
						url: cat.content.url,
						id: cat.content._uid,
					}));
					console.log(prettyCats);
					setCategories(prettyCats);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		const getFeatured = () => {
			Storyblok.get("cdn/stories/featured-item/", {})
				.then((response) => {
					const strictlyFeat = response.data.story.content;
					const prettyFeat = {
						date: strictlyFeat.date,
						description: strictlyFeat.description,
						title: strictlyFeat.title,
						url: strictlyFeat.url,
					};
					console.log(prettyFeat);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		const getData = async () => {
			await getBlogs();
			await getCategories();
			await getFeatured();
			setFetching(false);
		};
		getData();
	}, []);

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
			<Preload /> {/* Preloader for showing before page loads. */}
			<Navbar
				about={about}
				featured={featured}
				blogsRef={blogsRef}
				footer={footer}
			/>
			{/* Navbar - gets ref to this for scrolling to anchors. */}
			{!fetching && (
				<>
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => (
								<div>
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
										<meta
											property="og:description"
											content="Blog.TinoMuzambi"
										/>
										<meta property="og:image" content="/logo512.png" />

										{/* <!-- Twitter Meta Tags --> */}
										<meta name="twitter:card" content="summary_large_image" />
										<meta name="twitter:title" content="Blog.TinoMuzambi" />
										<meta
											name="twitter:description"
											content="Blog.TinoMuzambi"
										/>
										<meta name="twitter:image" content="/logo512.png" />
									</Helmet>
									<section className="about" ref={about}>
										<About /> {/* About section */}
									</section>
									<section className="featured" ref={featured}>
										<Featured /> {/* Featured section */}
									</section>
									<div className="search-wrapper">
										<Search query={queryText} searchBlogs={searchBlogs} />{" "}
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
								</div>
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
							<Route path="/blogs/:name" component={Blog} />
							{/* Blog route for displaying blog content. */}
							<Route path="/categories/:name" component={Category} />
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
			)}
		</>
	);
};

export default App;
