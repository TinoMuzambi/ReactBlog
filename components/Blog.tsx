import Link from "next/link";
import { FaUser, FaCalendar, FaArrowRight } from "react-icons/fa";
import Moment from "react-moment";
import { render } from "storyblok-rich-text-react-renderer";
import { markdownToRichtext } from "storyblok-markdown-richtext";

import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const Blog: React.FC<blokProps> = ({ blok }) => {
	const richtextData = markdownToRichtext(blok?.excerpt || "");

	return (
		<div
			className="post-content"
			data-aos="zoom-in"
			data-aos-delay="200"
			key={blok.url}
		>
			<div className="post-image">
				<div>
					<Link href={`/blogs/${blok.url}`} passHref>
						<DynamicComponent blok={blok?.image[0]} />
					</Link>
				</div>
				<div className="post-info flex-row">
					<span>
						<i className="fas fa-user text-gray">
							<FaUser />
						</i>
						&nbsp;&nbsp;Me
					</span>
					<span>
						<i className="fas fa-calendar-alt text-gray">
							<FaCalendar />
						</i>
						&nbsp;&nbsp;
						<Moment format="MMMM DD, YYYY">{blok.date}</Moment>
					</span>
				</div>
			</div>
			<div className="post-title">
				<Link href={`/blogs/${blok.url}`} passHref>
					{blok.title}
				</Link>
				<div>{render(richtextData)}</div>
				<Link href={`/blogs/${blok.url}`} passHref>
					<button className="btn post-btn">
						Read More &nbsp;{" "}
						<i className="fas fa-arrow-right">
							<FaArrowRight />
						</i>
					</button>
				</Link>
			</div>
			{/* <hr className={`${key === blogs.length - 1 ? "is-hidden" : ""}`}></hr> */}
			{/* Conditionally render element */}
		</div>
	);
};
export default Blog;
