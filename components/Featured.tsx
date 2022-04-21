import Moment from "react-moment";
import { render } from "storyblok-rich-text-react-renderer";
import { markdownToRichtext } from "storyblok-markdown-richtext";

import { blokProps } from "../interfaces";

const Featured: React.FC<blokProps> = ({ blok }): JSX.Element => {
	const richtextData = markdownToRichtext(blok.tag);
	return (
		<div className="container">
			<div
				className="featured"
				id="featured"
				data-aos="zoom-in-up"
				data-aos-delay="200"
			>
				<h1 className="featured-title text-center">{blok.title}</h1>
				<div className="item-container">
					<iframe
						width="100%"
						height="100%"
						src={`https://www.youtube.com/embed/${blok.video_link.substring(
							blok.video_link.lastIndexOf("/") + 1
						)}`}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						title={blok.video_title}
					/>
				</div>
				<h2>{blok.video_title}</h2>
				<h3>
					Updated on <Moment format="MMM DD, YYYY">{blok.updated_date}</Moment>
				</h3>
				<div>{render(richtextData)}</div>
			</div>
		</div>
	);
};
export default Featured;
