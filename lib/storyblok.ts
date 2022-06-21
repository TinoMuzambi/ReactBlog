import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
	accessToken: process.env.REACT_APP_STORYBLOK_KEY as string,
	cache: {
		clear: "auto",
		type: "memory",
	},
});

export default Storyblok;
