import React from "react";
import CommentContent from "./CommentContent";

const Comment = ({ comment }) => {
	// console.log(comment);
	return (
		<div className="comment">
			<CommentContent comments={comment} />
		</div>
	);
};

export default Comment;
