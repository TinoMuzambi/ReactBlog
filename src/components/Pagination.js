import React from "react";

const Pagination = ({ customLabels }) => {
	return (
		<div className="pagination">
			{customLabels.previous}
			{customLabels.next}
		</div>
	);
};

export default Pagination;
