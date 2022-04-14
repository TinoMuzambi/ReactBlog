import { blokProps } from "../interfaces";
import Placeholder from "./Placeholder";
import About from "./About";
import Image from "./Image";
import Featured from "./Featured";
import Category from "./Category";
import Blog from "./Blog";
import Blogs from "./Blogs";
import ThreeItemGrid from "./ThreeItemGrid";
import Text from "./Text";
import Icon from "./Icon";
import SocialIcons from "./SocialIcons";
import ImageGrid from "./ImageGrid";
import Footer from "./Footer";
import FooterColumn from "./FooterColumn";
import Categories from "./Categories";

const Components: any = {
	about: About,
	image: Image,
	featured: Featured,
	category: Category,
	blog: Blog,
	blogs: Blogs,
	three_item_grid: ThreeItemGrid,
	text: Text,
	icon: Icon,
	social_icons: SocialIcons,
	image_grid: ImageGrid,
	footer: Footer,
	footer_column: FooterColumn,
	categories: Categories,
};

const DynamicComponent: React.FC<blokProps> = ({ blok }): JSX.Element => {
	if (typeof Components[blok?.component] !== "undefined") {
		const Component = Components[blok?.component];

		return <Component blok={blok} />;
	}
	return <Placeholder componentName={blok?.component} />;
};

export default DynamicComponent;
