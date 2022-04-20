import { blokProps } from "../interfaces";

const BlogPage: React.FC<blokProps> = ({ blok }): JSX.Element => {
	console.log(blok);
	return <div className="BlogPage">BlogPage</div>;
};
export default BlogPage;
