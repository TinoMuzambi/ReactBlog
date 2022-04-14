import Link from "next/link";
import { FaUser, FaCalendar, FaArrowRight } from "react-icons/fa";
import Moment from "react-moment";

import { blokProps } from "../interfaces";

const Blog: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<div
			className="post-content"
			data-aos="zoom-in"
			data-aos-delay="200"
			key={blok.url}
		>
			<div className="post-image">
				<div>
					<Link href={`/blogs/${blok.url}`}>
						<a>
							<img src={blok.image} className="img" alt="shower" />
						</a>
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
				<Link href={`/blogs/${blok.url}`}>
					<a>
						{blok.title}
						{/* {ReactHtmlParser(
                            blok.content.slice(0, blok.content.indexOf("<br>")) + "</p>"
                        )}{" "} */}
						{/* Parse first paragraph of HTML blog content. */}
						<button className="btn post-btn">
							Read More &nbsp;{" "}
							<i className="fas fa-arrow-right">
								<FaArrowRight />
							</i>
						</button>
					</a>
				</Link>
			</div>
			{/* <hr className={`${key === blogs.length - 1 ? "is-hidden" : ""}`}></hr> */}
			{/* Conditionally render element */}
		</div>
	);
};
export default Blog;
