import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
	accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN as string,
	cache: {
		clear: "auto",
		type: "memory",
	},
});

export default Storyblok;
