import React from "react";

const Comment = ({ comment }) => {
	return (
		<div>
			<p>{comment.comment}</p>
		</div>
	);
};

export default Comment;
