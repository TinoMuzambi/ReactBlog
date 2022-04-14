import YouTube from "react-youtube";
import Moment from "react-moment";

import { blokProps } from "../interfaces";

const Featured: React.FC<blokProps> = ({ blok }): JSX.Element => {
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
					{/* <ReactPlayer
						url={blok.video_link}
						id={0}
						className="item"
						width="100%"
						height="100%"
						controls={true}
					/> */}
					<YouTube
						className="item"
						opts={{
							height: "100%",
							width: "100%",
							playerVars: { autoplay: 0 },
						}}
						videoId={blok.video_link.substring(
							blok.video_link.lastIndexOf("/") + 1
						)}
					/>
				</div>
				<h2>{blok.video_title}</h2>
				<h3>
					Updated on <Moment format="MMM DD, YYYY">{blok.updated_date}</Moment>
				</h3>
				<p>{blok.tag}</p>
			</div>
		</div>
	);
};
export default Featured;
