import StoryblokClient from "storyblok-js-client";
import { titleCase } from "./helpers";

// const BASE_URL = "https://api.storyblok.com/v1/cdn";
const Storyblok = new StoryblokClient({
	accessToken: process.env.REACT_APP_STORYBLOK_KEY,
	cache: {
		clear: "auto",
		type: "memory",
	},
});
export const getBlogs = async () => {
	let prettyBlogs = [];

	await Storyblok.get("cdn/stories?starts_with=blogs/", {
		sort_by: "content.date:desc",
	})
		.then((response) => {
			const strictlyBlogs = response.data.stories;
			prettyBlogs = strictlyBlogs.map((blog) => ({
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
		})
		.catch((error) => {
			console.error(error);
		});
	// console.log(prettyBlogs);
	return prettyBlogs;
};
export const getCategories = async () => {
	let prettyCats = [];
	await Storyblok.get("cdn/stories?starts_with=categories/", {})
		.then((response) => {
			const strictlyCats = response.data.stories;
			prettyCats = strictlyCats.map((cat) => ({
				count: cat.content.count,
				alt: cat.content.image.alt,
				image: cat.content.image.filename,
				name: cat.content.name,
				url: cat.content.url,
				id: cat.content._uid,
			}));
		})
		.catch((error) => {
			console.err0r(error);
		});

	console.log(prettyCats);
	return prettyCats;
};
export const getFeatured = async () => {
	let prettyFeat = {};
	await Storyblok.get("cdn/stories/featured-item/", {})
		.then((response) => {
			const strictlyFeat = response.data.story.content;
			prettyFeat = {
				date: strictlyFeat.date,
				description: strictlyFeat.description,
				title: strictlyFeat.title,
				url: strictlyFeat.url,
			};
		})
		.catch((error) => {
			console.error(error);
		});

	console.log(prettyFeat);
	return prettyFeat;
};
