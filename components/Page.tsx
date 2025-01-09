import DynamicComponent from "./DynamicComponent";
import { PageProps } from "../interfaces";

const Page: React.FC<PageProps> = ({ content }) => {
	return (
		<section className="page">
			{content?.body?.map((blok: any) => (
				<DynamicComponent blok={blok} key={blok._uid} />
			))}
		</section>
	);
};

export default Page;
