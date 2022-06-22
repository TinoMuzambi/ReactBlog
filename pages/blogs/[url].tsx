import { GetStaticPaths, GetStaticProps } from "next";
import Meta from "../../components/Meta";

import Page from "../../components/Page";
import { HomeProps } from "../../interfaces";
import Storyblok from "../../lib/storyblok";
import useStoryblok from "../../lib/storyblok-hook";
import { BASE_URL } from "../../utils";

const Blog: React.FC<HomeProps> = ({ story }): JSX.Element => {
	const storyblokUser = useStoryblok(story);
	const blog = storyblokUser?.content.body[1].blogs[0].content;
	console.log(blog);

	return (
		<>
			<Meta
				title={`${blog.title} | Blog.TinoMuzambi`}
				description={blog.excerpt}
				image={blog.image[0].image.filename}
				url={`${BASE_URL}/blogs/${blog.url}`}
			/>
			<Page content={storyblokUser?.content} />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	let slug = "?starts_with=blogs";
	let params = {
		version: process.env.STORYBLOK_ENV as string,
		cv: Date.now(),
		resolve_relations:
			"blog.category,sideblog.category,sidebar.categories,blogs.blogs,sidebar.other_blogs",
	};

	let { data } = await Storyblok.get(`cdn/stories/${slug}`, params);

	const paths = data.stories.map((story: any) => {
		const url = story.content.body.find(
			(item: any) => item.component === "blogs"
		).blogs[0].content.url;
		return {
			params: {
				url,
			},
		};
	});

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
	let slug = context?.params?.url;
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

	let { data } = await Storyblok.get(`cdn/stories/blogs/${slug}`, params);

	let blog = data.story.content.body.find(
		(item: any) => item.component === "blogs"
	);
	blog = {
		...blog,
		component: "blog_page",
	};

	let body: any[] = [];
	for (let i = 0; i < data.story.content.body.length; i++) {
		const item = data.story.content.body[i];
		if (item.component === "blogs") {
			body.push(blog);
		} else {
			body.push(item);
		}
	}

	return {
		props: {
			story: data
				? {
						...data.story,
						content: {
							...data.story.content,
							body: body,
						},
				  }
				: false,
			preview: context.preview || false,
		},
		revalidate: 10,
	};
};

export default Blog;
