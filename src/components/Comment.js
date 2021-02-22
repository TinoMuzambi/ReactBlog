import React from "react";

const Comment = ({ comment }) => {
	return (
		<div className="comment">
			<img src={comment.image} alt="Avatar" className="avatar" />
			<div className="details">
				<h4 className="author">{comment.user}</h4>
				<h5 className="date">{comment.date.toLocaleString()}</h5>
			</div>
			<p>{comment.comment}</p>
		</div>
	);
};

export default Comment;
