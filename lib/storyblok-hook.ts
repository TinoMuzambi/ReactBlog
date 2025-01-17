import { useEffect, useState } from "react";

import Storyblok from "../lib/storyblok";
import { BASE_URL } from "../utils";

export default function useStoryblok(originalStory: any) {
	let [story, setStory] = useState(originalStory);

	// adds the events for updating the visual editor
	// see https://www.storyblok.com/docs/guide/essentials/visual-editor#initializing-the-storyblok-js-bridge
	function initEventListeners() {
		const { StoryblokBridge } = window as any;
		if (typeof StoryblokBridge !== "undefined") {
			// initialize the bridge with your token

			const storyblokInstance = new StoryblokBridge({
				resolveRelations: [
					"blog.category",
					"sideblog.category",
					"sidebar.categories",
					"blogs.blogs",
					"sidebar.other_blogs",
				],
				customParent: BASE_URL,
			});

			// reload on Next.js page on save or publish event in the Visual Editor
			storyblokInstance.on(["change", "published"], () => location.reload());

			// live update the story on input events
			storyblokInstance.on("input", (event: any) => {
				if (event.story._uid === story._uid) {
					setStory(event.story);
				}
			});

			// live update the story on enter editor
			storyblokInstance.on("enterEditmode", (event: any) => {
				Storyblok.get(`cdn/stories/${event.storyId}`, {
					version: process.env.STORYBLOK_ENV as
						| "published"
						| "draft"
						| undefined,
				})
					.then(({ data }) => {
						if (data.story) {
							setStory(data.story);
						}
					})
					.catch((error) => {
						console.error(error);
					});
			});
		}
	}

	// appends the bridge script tag to our document
	// see https://www.storyblok.com/docs/guide/essentials/visual-editor#installing-the-storyblok-js-bridge
	function addBridge(callback: any) {
		// check if the script is already present
		const existingScript = document.getElementById("storyblokBridge");
		if (!existingScript) {
			const script = document.createElement("script");
			script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
			script.id = "storyblokBridge";
			document.body.appendChild(script);
			script.onload = () => {
				// once the scrip is loaded, init the event listeners
				callback();
			};
		} else {
			callback();
		}
	}

	useEffect(() => {
		setStory(originalStory);
	}, [originalStory]);

	useEffect(() => {
		// first load the bridge, then initialize the event listeners
		addBridge(initEventListeners);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return story;
}
