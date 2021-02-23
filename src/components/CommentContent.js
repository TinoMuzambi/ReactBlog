import React, { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

import CommentForm from "./CommentForm";

const CommentContent = ({ comment, indent }) => {
	const [liked, setLiked] = useState(false);
	const [replying, setReplying] = useState(false);

	const like = () => {
		setLiked(!liked);
		if (!liked) {
			comment.upvotes++;
		} else {
			comment.upvotes--;
		}
	};

	const reply = () => {
		setReplying(!replying);
	};

	return (
		<div className={`comment-content ${indent}`}>
			<div className="comment-container">
				<img src={comment.image} alt="Avatar" className="avatar"></img>
				<div className="group">
					<div className="details">
						<h4 className="author">{comment.user}</h4>
						<h5 className="date">{comment.date.toLocaleString()}</h5>
					</div>
					<p className="text">{comment.comment}</p>
				</div>
			</div>
			<div className="actions">
				<div className="like" onClick={like}>
					{liked ? <FcLike /> : <FcLikePlaceholder />}
				</div>
				<p className="upvotes">{comment.upvotes}</p>
				{indent !== "two" && (
					<p className="reply" onClick={reply}>
						Reply
					</p>
				)}
			</div>
			{replying && (
				<div className={`form-group ${indent !== "zero" && "no-left"}`}>
					<CommentForm sm={indent === "zero"} />
				</div>
			)}
		</div>
	);
};

export default CommentContent;
