import Link from "next/link";
import { FaCalendar } from "react-icons/fa";
import Moment from "react-moment";

import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const SideBlog: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<div className="post-content" data-aos="flip-up" data-aos-delay="200">
			<div className="post-image">
				<div>
					{/* If future just show image, else show image with link to that blog. */}
					{blok.future ? (
						<DynamicComponent blok={blok.image[0]} />
					) : (
						<Link href={`/blogs/${blok.url}`}>
							<a>
								<DynamicComponent blok={blok.image[0]} />
							</a>
						</Link>
					)}
				</div>
				<div className="post-info flex-row">
					<span>
						<i className="fas fa-calendar-alt text-gray">
							<FaCalendar />
						</i>
						&nbsp;&nbsp;
						{/* If future, show TBA for date, else show published date.*/}
						{blok.future ? (
							"TBA"
						) : (
							<Moment format="MMMM DD, YYYY">{blok.date}</Moment>
						)}
					</span>
				</div>
			</div>

			<div className="post-title">
				{/* If future show title with future tag, else show link to that blog. */}
				{blok.future ? (
					<h3 className="side-future">{blok.title}</h3>
				) : (
					<Link href={`/blogs/${blok.url}`}>
						<a>{blok.title}</a>
					</Link>
				)}
			</div>
		</div>
	);
};
export default SideBlog;
