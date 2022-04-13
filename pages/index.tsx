import { useState, useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { RiLightbulbFlashLine, RiLightbulbFill } from "react-icons/ri";
import AOS from "aos";
import { GetStaticProps } from "next";
import Storyblok from "../lib/storyblok";
import useStoryblok from "../lib/storyblok-hook";
import { HomeProps } from "../interfaces";
import Page from "../components/Page";

const Home: React.FC<HomeProps> = ({ story }): JSX.Element => {
	const storyblokUser = useStoryblok(story);

	return (
		<main className="home">
			<Page content={storyblokUser?.content} />
		</main>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
	let slug = "home";
	let params = {
		version: process.env.STORYBLOK_ENV as string,
		cv: Date.now(),
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
