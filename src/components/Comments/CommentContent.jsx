import React, { useState } from "react";
import {
	FcEmptyTrash,
	FcLike,
	FcLikePlaceholder,
	FcEditImage,
} from "react-icons/fc";
import Moment from "react-moment";

import CommentForm from "./CommentForm";

const CommentContent = ({
	comment,
	deleteHandler,
	user,
	comments,
	getComments,
	setComments,
	url,
	db,
}) => {
	const [replying, setReplying] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [editText, setEditText] = useState("");

	const editHandler = () => {
		setEditText(comment.comment);
		setReplying(!replying);
	};

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

	const getNextLevel = (level) => {
		if (level === "zero") {
			return "one";
		} else if (level === "one") {
			return "two";
		} else return "two";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (user) {
			if (commentText.trim()) {
				const newComment = {
					id: comments[comments.length - 1],
					user: user.displayName || "Anonymous",
					image:
						user.photoURL ||
						"https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif",
					comment: commentText,
					date: new Date(),
					upvotes: 0,
					liked: false,
					level: getNextLevel(comment.level),
				};
				comments[comments.length - 1]++;

				let newComments = comments;
				// console.log(comment);
				loop1: for (let i = 0; i < newComments.length; i++) {
					if (newComments[i]?.blog_url === url) {
						if (newComment.level === "one") {
							for (let j = 0; j < newComments[i]?.comments.length; j++) {
								if (newComments[i].comments[j].id === comment.id) {
									if (newComments[i].comments[j].replies) {
										newComments[i].comments[j].replies.unshift(newComment);
									} else {
										newComments[i].comments[j].replies = [newComment];
									}
									break loop1;
								}
							}
						} else {
							console.log(comments);
							for (let j = 0; j < newComments[i]?.comments.length; j++) {
								if (newComments[i].comments[j].replies) {
									for (
										let k = 0;
										k < newComments[i].comments[j].replies.length;
										k++
									) {
										if (
											newComments[i].comments[j].replies[k].id === comment.id
										) {
											console.log(newComments[i].comments[j].replies[k].id);
											console.log(comment.id);
											newComments[i].comments[j].replies[k].replies.unshift(
												newComment
											);
											break loop1;
										}
									}
								} else {
									for (
										let k = 0;
										k < newComments[i].comments[j].replies.length;
										k++
									) {
										if (
											newComments[i].comments[j].replies[k].id === comment.id
										) {
											newComments[i].comments[j].replies[k].replies = [
												newComment,
											];
											break loop1;
										}
									}
								}
							}
						}
					}
				}
				// setComments(newComments);
				console.log(newComments);

				const commentsDBRef = db.collection("comments").doc("comments");

				await commentsDBRef.set({
					comments: comments,
				});

				getComments();
				setCommentText("");
			} else {
				alert("Make an actual comment.");
			}
		} else {
			alert("Please sign in before posting a comment.");
		}
	};

	return (
		<div>
			<div className={`comment-content ${comment.level}`}>
				{comment.comment !== "deleted" ? (
					<>
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
									<h5 className="date" title={comment.date.toDate()}>
										<Moment format="MMM DD, YYYY">
											{comment.date.toDate()}
										</Moment>
									</h5>
								</div>
								<pre className="text">{comment.comment}</pre>
							</div>
						</div>
						<div className="actions">
							<div
								className="like"
								onClick={() => like(comment)}
								title={comment.liked ? "Unlike" : "Like"}
							>
								{comment.liked ? <FcLike /> : <FcLikePlaceholder />}
							</div>
							<p className="upvotes">{comment.upvotes}</p>
							{comment.level !== "two" && (
								<p className="reply" onClick={() => replyHandler()}>
									Reply
								</p>
							)}
							<FcEditImage
								className="edit"
								title="Edit"
								onClick={editHandler}
							/>
							<FcEmptyTrash
								className="delete"
								onClick={() => deleteHandler(comment.id)}
								title="Delete"
							/>
						</div>
						{replying && (
							<div
								className={`form-group ${
									comment.level !== "zero" && "no-left"
								}`}
							>
								<CommentForm
									editText={editText}
									sm={comment.level === "zero"}
									user={user}
									handleSubmit={handleSubmit}
									commentText={commentText}
									setCommentText={setCommentText}
								/>
							</div>
						)}
					</>
				) : (
					<div className="comment-container">
						<img
							src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
							alt="Avatar"
							className="avatar"
						></img>
						<div className="group">
							<div className="details">
								<h4 className="author">Deleted</h4>
							</div>
							<p className="text">This comment was deleted.</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentContent;
