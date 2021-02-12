import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const OpenSearch = ({ setQueryText }) => {
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const query = location.pathname.substring(8);
		setQueryText(query);
		history.push("/");
	}, [location.pathname]);

	return null;
};

export default OpenSearch;
