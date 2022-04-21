import { FaCalendar, FaUser } from "react-icons/fa";
import Moment from "react-moment";
import { render } from "storyblok-rich-text-react-renderer";
import { markdownToRichtext } from "storyblok-markdown-richtext";

import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";
import Meta from "./Meta";

const BlogPage: React.FC<blokProps> = ({ blok }): JSX.Element => {
	const blog = blok.blogs[0].content;
	const sidebar = blok.sidebar[0];
	const richtextData = markdownToRichtext(blog.content || "");

	return (
		<>
			<Meta title={`${blog.title} | Blog.TinoMuzambi`} />
			<main className="container" id="blogs">
				<div className="site-content">
					<div className="posts">
						<div
							className="post-content"
							data-aos="zoom-in"
							data-aos-delay="200"
						>
							<div className="post-title">
								<h1>{blog.title}</h1>
								<h3>
									<i className="fas fa-user text-gray">
										<FaUser />
									</i>
									&nbsp;Me&nbsp;&nbsp;
									<i className="fas fa-calendar-alt text-gray">
										<FaCalendar />
									</i>
									&nbsp;<Moment format="MMM DD, YYYY">{blog.date}</Moment>
								</h3>
								<div className="post-image">
									<div>
										<DynamicComponent blok={blog.image[0]} />
									</div>
								</div>
							</div>

							<div className="blog-html">{render(richtextData)}</div>
						</div>

						{/* <Comments url={pathname} /> */}
					</div>
					<DynamicComponent blok={sidebar} />
				</div>
			</main>
		</>
	);
};
export default BlogPage;
