import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
	<>
		<div className="not-found-page">
			<h1 className="title">Looks like you got lost.</h1>
			<Link to="/">
				<h2 className="subtitle">Let's get you back home.</h2>
			</Link>
		</div>
	</>
);

export default NotFoundPage;
