import { useState, useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { RiLightbulbFlashLine, RiLightbulbFill } from "react-icons/ri";
import AOS from "aos";

const Home: React.FC = (): JSX.Element => {
	const [queryText, setQueryText] = useState("");
	const [searching, setSearching] = useState(false);
	const [dark, setDark] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [blogs, setBlogs] = useState([]);
	const [categories, setCategories] = useState([]);
	const [featuredItem, setFeaturedItem] = useState({});
	return (
		<main>
			<p>Clean Next.js with TypeScript and Sass Boilerplate</p>
		</main>
	);
};

export default Home;
