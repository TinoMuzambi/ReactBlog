import { GetStaticPaths, GetStaticProps } from "next";
import Meta from "../../components/Meta";

import Page from "../../components/Page";
import { HomeProps } from "../../interfaces";
import Storyblok from "../../lib/storyblok";
import useStoryblok from "../../lib/storyblok-hook";
import { BASE_URL } from "../../utils";

const CategoryPage: React.FC<HomeProps> = ({ story }): JSX.Element => {
	const storyblokUser = useStoryblok(story);

	const title = storyblokUser?.content.body[1].title;
	const image = storyblokUser?.content.body[2].image;
	const description = storyblokUser?.content.body[3].text;
	const content = {
		...storyblokUser?.content,
		body: [
			...storyblokUser?.content.body.slice(0, 2),
			storyblokUser?.content.body[4],
		],
	};

	return (
		<>
			<Meta
				title={`${title} | Blog.TinoMuzambi`}
				description={description}
				image={image.filename}
				url={`${BASE_URL}/categories/${title.toLowerCase()}`}
			/>
			<Page content={content} />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	let slug = "?starts_with=categories";
	let params = {
		version: process.env.STORYBLOK_ENV as string,
		cv: Date.now(),
		resolve_relations:
			"blog.category,sideblog.category,sidebar.categories,blogs.blogs,sidebar.other_blogs",
	};

	let { data } = await Storyblok.get(`cdn/stories/${slug}`, params);

	const paths = data.stories.map((story: any) => {
		const name = story.slug;
		return {
			params: {
				name,
			},
		};
	});

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
	let slug = context?.params?.name;
	let params = {
		version: process.env.STORYBLOK_ENV as string,
		cv: Date.now(),
		resolve_relations:
			"blog.category,sideblog.category,sidebar.categories,blogs.blogs,sidebar.other_blogs",
	};

	if (context.preview) {
		params.version = process.env.STORYBLOK_ENV as string;
		params.cv = Date.now();
	}

	let { data } = await Storyblok.get(`cdn/stories/categories/${slug}`, params);

	return {
		props: {
			story: data ? data.story : false,
			preview: context.preview || false,
		},
		revalidate: 10,
	};
};

export default CategoryPage;
