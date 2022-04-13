import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const About: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<section className="site-title">
			<div className="site-background text-center">
				<DynamicComponent blok={blok.image} />
				<h1>{blok.title}</h1>
				<h2>
					<s>{blok.fake_job_title}</s>&nbsp;{blok.job_title}
				</h2>
			</div>
		</section>
	);
};
export default About;
