import React from "react";
import CommentHolder from "./CommentHolder";

const Comment = ({ comment }) => {
	// console.log(comment);
	return (
		<div className="comment">
			<CommentHolder comments={comment} />
		</div>
	);
};

export default Comment;
