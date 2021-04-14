import React, { useState, useEffect } from "react";
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
	users,
}) => {
	const [replying, setReplying] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [editText, setEditText] = useState("");
	const [editID, setEditID] = useState(-1);
	const [currUserData, setCurrUserData] = useState({});

	const editHandler = async (id) => {
		if (user) {
			console.log(user);
			if (user.displayName === comment.user) {
				setEditText(comment.comment);
				setReplying(!replying);
				setEditID(id);
			} else if (user.isAnonymous) {
				alert("Anonymous users don't get the privilege of editing.😬");
			} else {
				alert("You can only edit comments that you made.");
			}
		} else {
			alert("Please log in to edit.");
		}
	};

	useEffect(() => {
		if (user) {
			setCurrUserData(users.find((u) => u.username === user.displayName));
		}
	}, [user, users]);

	const like = (commentParam) => {
		let upvotes = commentParam.upvotes;
		if (user) {
			if (commentParam.user === currUserData.username) {
				return alert("No liking your own comments!");
			}
			if (currUserData?.liked_ids.includes(commentParam.id)) {
				upvotes--;
			} else {
				upvotes++;
			}

			const currComments = comments.find((c) => c.blog_url === url);

			const topIDs = currComments.comments?.map((c) => c.id);

			let secondIDs = [];
			for (let i = 0; i < currComments.comments.length; i++) {
				for (let j = 0; j < currComments.comments[i]?.replies?.length; j++) {
					secondIDs.push(currComments.comments[i]?.replies[j]?.id);
				}
			}

			if (topIDs.includes(commentParam.id)) {
				for (let i = 0; i < currComments?.comments?.length; i++) {
					if (currComments?.comments[i]?.id === commentParam.id) {
						currComments.comments[i] = {
							...currComments?.comments[i],
							upvotes: upvotes,
						};
					}
				}
			} else if (secondIDs?.includes(commentParam.id)) {
				let newComments = currComments?.comments;

				for (let i = 0; i < currComments?.comments?.length; i++) {
					for (let j = 0; j < currComments?.comments[i]?.replies?.length; j++) {
						if (currComments?.comments[i]?.replies[j]?.id === commentParam.id) {
							newComments[i].replies[j] = {
								...currComments?.comments[i]?.replies[j],
								upvotes: upvotes,
							};
						} else {
							newComments[i].replies[j] = {
								...currComments?.comments[i]?.replies[j],
							};
						}
					}
				}
			}

			let likedComments = [];
			for (let i = 0; i < comments.length; i++) {
				if (comments[i].blog_url === url) {
					likedComments[i] = currComments;
				} else {
					likedComments[i] = comments[i];
				}
			}

			postToDB(likedComments);

			let updatedLikes = currUserData;
			if (!updatedLikes.liked_ids?.includes(commentParam.id)) {
				updatedLikes.liked_ids.push(commentParam.id);
			} else {
				updatedLikes.liked_ids = updatedLikes.liked_ids.filter(
					(i) => i !== commentParam.id
				);
			}
			setCurrUserData(updatedLikes);

			const usersDBRef = db.collection("users").doc("users");
			let newUsers = [];
			for (let i = 0; i < users.length; i++) {
				if (users[i].id === updatedLikes.id) {
					newUsers[i] = updatedLikes;
				} else {
					newUsers[i] = users[i];
				}
			}

			usersDBRef.set({
				users: newUsers,
			});

			getComments();
		} else {
			return alert("Log in to like!");
		}
	};

	const replyHandler = () => {
		if (user) {
			setEditText("");
			setReplying(!replying);
		} else {
			alert("Please log in to reply.");
		}
	};

	const getNextLevel = (level) => {
		if (level === "zero") {
			return "one";
		} else if (level === "one") {
			return "two";
		} else return "two";
	};

	const postToDB = async (updatedComments) => {
		const commentsDBRef = db.collection("comments").doc("comments");

		await commentsDBRef.set({
			comments: updatedComments,
		});

		getComments();
		setCommentText("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (user) {
			if (editText) {
				const currComments = comments.find((c) => c.blog_url === url);

				const topIDs = currComments.comments?.map((c) => c.id);
				let secondIDs = [];
				for (let i = 0; i < currComments.comments.length; i++) {
					for (let j = 0; j < currComments.comments[i]?.replies?.length; j++) {
						secondIDs.push(currComments.comments[i]?.replies[j]?.id);
					}
				}

				if (topIDs.includes(editID)) {
					for (let i = 0; i < currComments?.comments?.length; i++) {
						if (currComments?.comments[i]?.id === editID) {
							currComments.comments[i] = {
								...currComments?.comments[i],
								comment: commentText,
							};
						}
					}
				} else if (secondIDs?.includes(editID)) {
					let newComments = currComments?.comments;

					for (let i = 0; i < currComments?.comments?.length; i++) {
						for (
							let j = 0;
							j < currComments?.comments[i]?.replies?.length;
							j++
						) {
							if (currComments?.comments[i]?.replies[j]?.id === editID) {
								newComments[i].replies[j] = {
									...currComments?.comments[i]?.replies[j],
									comment: commentText,
								};
							} else {
								newComments[i].replies[j] = {
									...currComments?.comments[i]?.replies[j],
								};
							}
						}
					}
				} else {
					let newComments = currComments.comments;

					for (let i = 0; i < currComments?.comments?.length; i++) {
						for (
							let j = 0;
							j < currComments?.comments[i]?.replies?.length;
							j++
						) {
							for (
								let k = 0;
								k < currComments?.comments[i]?.replies[j]?.replies?.length;
								k++
							) {
								if (
									currComments?.comments[i]?.replies[j]?.replies[k]?.id ===
									editID
								) {
									newComments[i].replies[j].replies[k] = {
										...currComments?.comments[i]?.replies[j]?.replies[k],
										comment: commentText,
									};
								} else {
									newComments[i].replies[j].replies[k] = {
										...currComments?.comments[i]?.replies[j]?.replies[k],
									};
								}
							}
						}
					}
				}

				let editComments = [];
				for (let i = 0; i < comments.length; i++) {
					if (comments[i].blog_url === url) {
						editComments[i] = currComments;
					} else {
						editComments[i] = comments[i];
					}
				}

				postToDB(editComments);
			} else {
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
						level: getNextLevel(comment.level),
					};

					comments[comments.length - 1]++;
					let newComments = comments;
					loop1: for (let i = 0; i < newComments.length; i++) {
						if (newComments[i]?.blog_url === url) {
							if (newComment.level === "one") {
								for (let j = 0; j < newComments[i]?.comments.length; j++) {
									if (newComments[i].comments[j].id === comment.id) {
										if (newComments[i].comments[j].replies) {
											newComments[i].comments[j].replies.push(newComment);
										} else {
											newComments[i].comments[j].replies = [newComment];
										}
										break loop1;
									}
								}
							} else {
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
												if (newComments[i].comments[j].replies[k].replies) {
													newComments[i].comments[j].replies[k].replies.push(
														newComment
													);
												} else {
													newComments[i].comments[j].replies[k].replies = [
														newComment,
													];
												}
												break loop1;
											}
										}
									}
								}
							}
						}
					}
					setComments(newComments);

					postToDB(comments);
				} else {
					alert("Make an actual comment.");
				}
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
								title={
									currUserData?.liked_ids?.includes(comment.id)
										? "Unlike"
										: "Like"
								}
							>
								{currUserData?.liked_ids?.includes(comment.id) ? (
									<FcLike />
								) : (
									<FcLikePlaceholder />
								)}
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
								onClick={() => editHandler(comment.id)}
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
