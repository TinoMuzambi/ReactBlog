import React from "react";
import comments from "../firebase/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = () => {
	return (
		<div className="comments">
			<h1>Comments</h1>
			<div className="form-group">
				<img
					src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
					alt="Avatar"
				/>
				<CommentForm />
			</div>
			{comments.map((comment) => (
				<Comment key={comment.id} comment={comment} length={comments.length} />
			))}
		</div>
	);
};

export default Comments;
