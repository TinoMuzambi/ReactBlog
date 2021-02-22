import React from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Comment = ({ comment }) => {
	return (
		<div className="comment">
			<img src={comment.image} alt="Avatar" className="avatar" />
			<div className="group">
				<div className="details">
					<h4 className="author">{comment.user}</h4>
					<h5 className="date">{comment.date.toLocaleString()}</h5>
				</div>
				<p className="text">{comment.comment}</p>
			</div>
			<div className="actions">
				<FcLikePlaceholder />
				<p className="upvotes">{comment.upvotes}</p>
			</div>
			<div className="underline"></div>
		</div>
	);
};

export default Comment;
