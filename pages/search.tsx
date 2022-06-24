import { useRouter } from "next/router";
import { useEffect } from "react";

const Search: React.FC = (): JSX.Element => {
	const router = useRouter();
	useEffect(() => {
		router.push({
			pathname: "/",
			query: {
				search: router.query.search_query,
			},
		});
	}, [router]);

	return <></>;
};
export default Search;
