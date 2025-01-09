import { JSX } from "react";
import { blokProps, MyCustomCSS } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const About: React.FC<blokProps> = ({ blok }) => {
	return (
		<section
			className="site-title"
			data-aos="fade-up"
			data-aos-delay="100"
			id="about"
			style={
				{
					"--bg-image":
						`url(${blok.background_image[0].image.filename})` as string,
				} as MyCustomCSS
			}
		>
			<div className="site-background text-center">
				<DynamicComponent blok={blok.image[0]} />
				<h1>{blok.title}</h1>
				<h2>
					<s>{blok.fake_job_title}</s>&nbsp;{blok.job_title}
				</h2>
			</div>
		</section>
	);
};
export default About;
