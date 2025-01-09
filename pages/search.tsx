import { useRouter } from "next/router";

import { useDidMountEffect } from "../utils";

const Search: React.FC = () => {
	const router = useRouter();

	useDidMountEffect(() => {
		router.push({
			pathname: "/",
			query: {
				search: router.query.search_query,
			},
		});
	}, [router]);

	return (
		<main>
			<h1>Redirecting...</h1>
		</main>
	);
};
export default Search;
