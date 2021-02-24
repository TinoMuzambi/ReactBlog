import React, { useState } from "react";
import { FcEmptyTrash, FcLike, FcLikePlaceholder } from "react-icons/fc";
import Moment from "react-moment";

import CommentForm from "./CommentForm";

const CommentContent = ({ comment }) => {
	const [replying, setReplying] = useState(false);

	const like = (commentParam) => {
		commentParam.liked = !commentParam.liked;
		if (commentParam.liked) {
			commentParam.upvotes++;
		} else {
			commentParam.upvotes--;
		}
	};

	const replyHandler = () => {
		setReplying(!replying);
	};

	return (
		<div>
			<div className={`comment-content ${comment.level}`}>
				<div className="comment-container">
					<img
						src={
							comment.image ||
							"https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
						}
						alt="Avatar"
						className="avatar"
					></img>
					<div className="group">
						<div className="details">
							<h4 className="author">{comment.user}</h4>
							<h5 className="date">
								<Moment format="MMM DD, YYYY">{comment.date}</Moment>
							</h5>
						</div>
						<p className="text">{comment.comment}</p>
					</div>
				</div>
				<div className="actions">
					<div className="like" onClick={() => like(comment)}>
						{comment.liked ? <FcLike /> : <FcLikePlaceholder />}
					</div>
					<p className="upvotes">{comment.upvotes}</p>
					{comment.level !== "two" && (
						<p className="reply" onClick={() => replyHandler()}>
							Reply
						</p>
					)}
					<FcEmptyTrash className="delete" />
				</div>
				{replying && (
					<div
						className={`form-group ${comment.level !== "zero" && "no-left"}`}
					>
						<CommentForm sm={comment.level === "zero"} />
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentContent;
