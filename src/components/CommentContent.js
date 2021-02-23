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

	const replyHandler = () => {
		setReplying(!replying);
	};

	console.log(comments);

	return comments.comments.map((comment) => (
		<>
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
						<p className="reply" onClick={replyHandler}>
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
							{indent !== "two" && (
								<p className="reply" onClick={replyHandler}>
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
								{indent !== "two" && (
									<p className="reply" onClick={replyHandler}>
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
					))}
				</>
			))}
		</>
	));
};

export default CommentContent;
