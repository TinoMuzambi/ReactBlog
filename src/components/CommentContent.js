import React, { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Moment from "react-moment";

import CommentForm from "./CommentForm";

const CommentContent = ({ comments }) => {
	const [liked, setLiked] = useState(false);
	const [replying, setReplying] = useState(false);
	const [replying2, setReplying2] = useState(false);
	const [replying3, setReplying3] = useState(false);

	const like = () => {
		setLiked(!liked);
		// if (!liked) {
		// 	comment.upvotes++;
		// } else {
		// 	comment.upvotes--;
		// }
	};

	const replyHandler = (level) => {
		if (level === 0) {
			setReplying(!replying);
		} else if (level === 1) {
			setReplying2(!replying2);
		} else {
			setReplying3(!replying3);
		}
	};

	console.log(comments);

	return comments.comments.map((comment) => (
		<>
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
					<div className="like" onClick={like}>
						{comments.liked ? <FcLike /> : <FcLikePlaceholder />}
					</div>
					<p className="upvotes">{comment.upvotes}</p>
					{comment.level !== "two" && (
						<p className="reply" onClick={() => replyHandler(0)}>
							Reply
						</p>
					)}
				</div>
				{replying && (
					<div
						className={`form-group ${comment.level !== "zero" && "no-left"}`}
					>
						<CommentForm sm={comment.level === "zero"} />
					</div>
				)}
			</div>
			{comment?.replies?.map((reply) => (
				<>
					<div className={`comment-content ${reply.level}`}>
						<div className="comment-container">
							<img
								src={
									reply.image ||
									"https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
								}
								alt="Avatar"
								className="avatar"
							></img>
							<div className="group">
								<div className="details">
									<h4 className="author">{reply.user}</h4>
									<h5 className="date">
										<Moment format="MMM DD, YYYY">{reply.date}</Moment>
									</h5>
								</div>
								<p className="text">{reply.comment}</p>
							</div>
						</div>
						<div className="actions">
							<div className="like" onClick={like}>
								{comments.liked ? <FcLike /> : <FcLikePlaceholder />}
							</div>
							<p className="upvotes">{reply.upvotes}</p>
							{reply.level !== "two" && (
								<p className="reply" onClick={() => replyHandler(1)}>
									Reply
								</p>
							)}
						</div>
						{replying2 && (
							<div
								className={`form-group ${reply.level !== "zero" && "no-left"}`}
							>
								<CommentForm sm={reply.level === "zero"} />
							</div>
						)}
					</div>
					{reply?.replies?.map((replyTwo) => (
						<div className={`comment-content ${replyTwo.level}`}>
							<div className="comment-container">
								<img
									src={
										replyTwo.image ||
										"https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
									}
									alt="Avatar"
									className="avatar"
								></img>
								<div className="group">
									<div className="details">
										<h4 className="author">{replyTwo.user}</h4>
										<h5 className="date">
											<Moment format="MMM DD, YYYY">{replyTwo.date}</Moment>
										</h5>
									</div>
									<p className="text">{replyTwo.comment}</p>
								</div>
							</div>
							<div className="actions">
								<div className="like" onClick={like}>
									{comments.liked ? <FcLike /> : <FcLikePlaceholder />}
								</div>
								<p className="upvotes">{replyTwo.upvotes}</p>
								{replyTwo.level !== "two" && (
									<p className="reply" onClick={() => replyHandler(2)}>
										Reply
									</p>
								)}
							</div>
							{replying3 && (
								<div
									className={`form-group ${
										replyTwo.level !== "zero" && "no-left"
									}`}
								>
									<CommentForm sm={replyTwo.level === "zero"} />
								</div>
							)}
						</div>
					))}
				</>
			))}
		</>
	));
};

export default CommentContent;
