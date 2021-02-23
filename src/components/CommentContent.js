import React, { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Moment from "react-moment";

import CommentForm from "./CommentForm";

const CommentContent = ({ comments, indent }) => {
	const [liked, setLiked] = useState(false);
	const [replying, setReplying] = useState(false);

	const like = () => {
		setLiked(!liked);
		// if (!liked) {
		// 	comment.upvotes++;
		// } else {
		// 	comment.upvotes--;
		// }
	};

	const reply = () => {
		setReplying(!replying);
	};

	return indent === "zero" ? (
		comments.comments.map((comment) => (
			<div className={`comment-content ${indent}`}>
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
					<div className="like" onClick={like}>
						{comments.liked ? <FcLike /> : <FcLikePlaceholder />}
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
		))
	) : (
		<div className={`comment-content ${indent}`}>
			<div className="comment-container">
				<img src={comments.image} alt="Avatar" className="avatar"></img>
				<div className="group">
					<div className="details">
						<h4 className="author">{comments.user}</h4>
						<h5 className="date">
							<Moment format="MMM DD, YYYY">{comments.date}</Moment>
						</h5>
					</div>
					<p className="text">{comments.comment}</p>
				</div>
			</div>
			<div className="actions">
				<div className="like" onClick={like}>
					{comments.liked ? <FcLike /> : <FcLikePlaceholder />}
				</div>
				<p className="upvotes">{comments.upvotes}</p>
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
