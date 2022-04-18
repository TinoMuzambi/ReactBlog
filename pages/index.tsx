import { useState, useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { RiLightbulbFlashLine, RiLightbulbFill } from "react-icons/ri";
import AOS from "aos";
import { GetStaticProps } from "next";
import Storyblok from "../lib/storyblok";
import useStoryblok from "../lib/storyblok-hook";
import { HomeProps } from "../interfaces";
import Page from "../components/Page";
import Preload from "../components/Preload";

const Home: React.FC<HomeProps> = ({ story }): JSX.Element => {
	const storyblokUser = useStoryblok(story);
	const [dark, setDark] = useState(false);

	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.
	}, []);

	useEffect(() => {
		window.addEventListener("load", () => {
			const preloader = document.querySelector(".preload");
			preloader?.classList.add("finish");
		});
		return () => {
			window.removeEventListener("load", () => {
				const preloader = document.querySelector(".preload");
				preloader?.classList.add("finish");
			});
		};
	}, []);

	useEffect(() => {
		const lsDark = JSON.parse(localStorage.getItem("blogtino-dark") as string);
		if (lsDark === true || lsDark === false) {
			setDark(lsDark);
			document.body.classList.remove("dark");

			lsDark
				? document.body.classList.add("dark")
				: document.body.classList.remove("dark");
		}
	}, []);

	return (
		<>
			<Preload />
			<main className="home">
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
				<Page content={storyblokUser?.content} />
			</main>
		</>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
	let slug = "home";
	let params = {
		version: process.env.STORYBLOK_ENV as string,
		cv: Date.now(),
		resolve_relations: "blog.category,sideblog.category,sidebar.categories",
	};

	if (context.preview) {
		params.version = process.env.STORYBLOK_ENV as string;
		params.cv = Date.now();
	}

	let { data } = await Storyblok.get(`cdn/stories/${slug}`, params);

	return {
		props: {
			story: data ? data.story : false,
			preview: context.preview || false,
		},
		revalidate: 10,
	};
};
