import { useEffect } from "react";
import AOS from "aos";
import { GetStaticProps } from "next";

import Storyblok from "../lib/storyblok";
import useStoryblok from "../lib/storyblok-hook";
import { HomeProps } from "../interfaces";
import Page from "../components/Page";
import Preload from "../components/Preload";

const Home: React.FC<HomeProps> = ({ story }) => {
	const storyblokUser = useStoryblok(story);

	useEffect(() => {
		AOS.init(); // Initialise animate on scroll library.
	}, []);

	// useEffect(() => {
	// 	window.addEventListener("load", () => {
	// 		const preloader = document.querySelector(".preload");
	// 		preloader?.classList.add("finish");
	// 	});
	// 	return () => {
	// 		window.removeEventListener("load", () => {
	// 			const preloader = document.querySelector(".preload");
	// 			preloader?.classList.add("finish");
	// 		});
	// 	};
	// }, []);

	return (
		<>
			{/* <Preload /> */}
			<main className="home">
				<Page content={storyblokUser?.content} />
			</main>
		</>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
	let slug = "home";
	let params = {
		version: process.env.STORYBLOK_ENV as "published" | "draft" | undefined,
		cv: Date.now(),
		resolve_relations:
			"blog.category,sideblog.category,sidebar.categories,blogs.blogs,sidebar.other_blogs",
	};

	if (context.preview) {
		params.version = process.env.STORYBLOK_ENV as
			| "published"
			| "draft"
			| undefined;
		params.cv = Date.now();
	}

	let { data } = await Storyblok.get(`cdn/stories/${slug}`, params);

	return {
		props: {
			story: data ? data.story : false,
			preview: context.preview || false,
		},
		revalidate: 60,
	};
};
