import React, { useState, useEffect } from "react";
import {
	FcEmptyTrash,
	FcLike,
	FcLikePlaceholder,
	FcEditImage,
} from "react-icons/fc";
import Moment from "react-moment";
import emailjs, { init } from "emailjs-com";

import {
	confirmCommentContent,
	confirmEditOwnComments,
	confirmSignInEdit,
	confirmSignInLike,
	confirmSignInReply,
	confirmSignInComment,
	confirmAnonEdit,
	confirmAnonLike,
	confirmLikeOwnComments,
	postToCommentsDB,
	getTopIDs,
	getSecondIDs,
	postToUsersDB,
	getNextLevel,
	ANON_IMAGE,
} from "../../utils/helpers";
import CommentForm from "./CommentForm";

const CommentContent = ({
	comment,
	deleteHandler,
	user,
	comments,
	getData,
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

	useEffect(() => {
		// Set current user data on user change.
		if (user) {
			setCurrUserData(users.find((u) => u.username === user.displayName));
		}
	}, [user, users]);

	const editHandler = async (id) => {
		// Handler for editing comment with given id.
		if (user) {
			if (user.displayName === comment.user) {
				setEditText(comment.comment);
				setReplying(!replying);
				setEditID(id);
			} else if (user.displayName !== comment.user) {
				if (user.isAnonymous) {
					return confirmAnonEdit();
				} else {
					return confirmEditOwnComments();
				}
			}
		} else {
			return confirmSignInEdit();
		}
	};

	const like = (commentParam) => {
		let upvotes = commentParam.upvotes;
		let likers = commentParam.likers;
		if (user) {
			if (user.isAnonymous) {
				return confirmAnonLike();
			}
			if (commentParam.user === currUserData.username) {
				return confirmLikeOwnComments();
			}
			if (currUserData?.liked_ids.includes(commentParam.id)) {
				// Unlike : Decrement upvotes and remove name from likers
				upvotes--;
				likers = likers.filter((l) => l !== user.displayName);
			} else {
				// Like : Increment upvotes and push name to likers
				upvotes++;
				likers.push(user.displayName);
			}

			// ---------- Handle comment like data ------------------
			const currComments = comments.find((c) => c.blog_url === url);

			const topIDs = getTopIDs(currComments);
			const secondIDs = getSecondIDs(currComments);

			if (topIDs.includes(commentParam.id)) {
				for (let i = 0; i < currComments?.comments?.length; i++) {
					if (currComments?.comments[i]?.id === commentParam.id) {
						currComments.comments[i] = {
							...currComments?.comments[i],
							upvotes: upvotes,
							likers: likers,
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

			// ---------- Handle user like data ------------------
			let updatedLikes = currUserData;
			if (!updatedLikes.liked_ids?.includes(commentParam.id)) {
				updatedLikes.liked_ids.push(commentParam.id);
			} else {
				updatedLikes.liked_ids = updatedLikes.liked_ids.filter(
					(i) => i !== commentParam.id
				);
			}
			setCurrUserData(updatedLikes);

			// Save data to db.
			let newUsers = [];

			for (let i = 0; i < users.length; i++) {
				if (users[i].id === updatedLikes.id) {
					newUsers[i] = updatedLikes;
				} else {
					newUsers[i] = users[i];
				}
			}

			postToUsersDB(newUsers, db);
			postToCommentsDB(likedComments, getData, setCommentText, db);
		} else {
			return confirmSignInLike();
		}
	};

	const replyHandler = () => {
		// Handler for enabling replies.
		if (user) {
			setEditText("");
			setReplying(!replying);
		} else {
			return confirmSignInReply();
		}
	};

	const editComment = () => {
		// Editing comment logic.
		if (commentText.trim()) {
			const currComments = comments.find((c) => c.blog_url === url);

			const topIDs = getTopIDs(currComments);
			const secondIDs = getSecondIDs(currComments);

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
					for (let j = 0; j < currComments?.comments[i]?.replies?.length; j++) {
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
					for (let j = 0; j < currComments?.comments[i]?.replies?.length; j++) {
						for (
							let k = 0;
							k < currComments?.comments[i]?.replies[j]?.replies?.length;
							k++
						) {
							if (
								currComments?.comments[i]?.replies[j]?.replies[k]?.id === editID
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

			postToCommentsDB(editComments, getData, setCommentText, db);
		} else {
			return confirmCommentContent();
		}
	};

	const addComment = () => {
		// Adding comment logic
		if (commentText.trim()) {
			const newComment = {
				id: comments[comments.length - 1],
				user: user.displayName || "Anonymous",
				image: user.photoURL || ANON_IMAGE,
				comment: commentText,
				date: new Date(),
				upvotes: 0,
				likers: [],
				level: getNextLevel(comment.level),
			};

			comments[comments.length - 1]++;
			let newComments = comments;
			let subscribers = [];
			loop1: for (let i = 0; i < newComments.length; i++) {
				if (newComments[i]?.blog_url === url) {
					if (newComment.level === "one") {
						for (let j = 0; j < newComments[i]?.comments.length; j++) {
							if (newComments[i].comments[j].id === comment.id) {
								if (newComments[i].comments[j].replies) {
									newComments[i].comments[j].replies.push(newComment);
									if (newComments[i].comments[j].subscribers) {
										if (!user?.isAnonymous) {
											newComments[i].comments[j].subscribers.push(user?.email);
											subscribers = newComments[i].comments[j].subscribers;
										}
									} else {
										if (!user?.isAnonymous) {
											newComments[i].comments[j].subscribers = [user?.email];
											subscribers = newComments[i].comments[j].subscribers;
										}
									}
								} else {
									newComments[i].comments[j].replies = [newComment];
									if (newComments[i].comments[j].subscribers) {
										if (!user?.isAnonymous) {
											newComments[i].comments[j].subscribers = [user?.email];
											subscribers = newComments[i].comments[j].subscribers;
										}
									}
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
									if (newComments[i].comments[j].replies[k].id === comment.id) {
										if (newComments[i].comments[j].replies[k].replies) {
											newComments[i].comments[j].replies[k].replies.push(
												newComment
											);
											if (newComments[i].comments[j].replies[k].subscribers) {
												if (!user?.isAnonymous) {
													newComments[i].comments[j].replies[
														k
													].subscribers.push(user?.email);
													subscribers =
														newComments[i].comments[j].replies[k].subscribers;
												}
											} else {
												if (!user?.isAnonymous) {
													newComments[i].comments[j].replies[k].subscribers = [
														user?.email,
													];
													subscribers =
														newComments[i].comments[j].replies[k].subscribers;
												}
											}
										} else {
											newComments[i].comments[j].replies[k].replies = [
												newComment,
											];
											if (newComments[i].comments[j].replies[k].subscribers) {
												if (!user.isAnonymous) {
													newComments[i].comments[j].replies[k].subscribers = [
														user?.email,
													];
													subscribers =
														newComments[i].comments[j].replies[k].subscribers;
												}
											}
										}
										break loop1;
									}
								}
							}
						}
					}
				}
			}
			console.log(newComments);
			setComments(newComments);
			if (subscribers)
				sendEmails(subscribers, user.displayName, url, newComment.comment);
			// postToCommentsDB(comments, getData, setCommentText, db);
		} else {
			return confirmCommentContent();
		}
	};

	const handleSubmit = async (e) => {
		// Handler for new/edited comments.
		e.preventDefault();

		if (user) {
			if (editText) {
				// Editing existing comment.
				editComment();
			} else {
				// Adding new comment.
				addComment();
			}
		} else {
			return confirmSignInComment();
		}
	};

	const sendEmails = (subscribers, user_mail, blog_url, comment_body) => {
		console.log("Sending emails to ", subscribers);
		init(process.env.REACT_APP_MAIL_PASS);
		subscribers.forEach((sub) => {
			const templateParams = {
				to_mail: sub,
				user: user_mail,
				blog_url: "https://blog.tinomuzambi/blogs/" + blog_url,
				comment: comment_body,
			};

			emailjs.send("service_w0jctc8", "template_27dkvq6", templateParams).then(
				function (response) {
					console.log("SUCCESS!", response.status, response.text);
				},
				function (error) {
					console.log("FAILED...", error);
				}
			);
		});
	};

	return (
		<div>
			<div className={`comment-content ${comment.level}`}>
				{comment.comment !== "deleted" ? (
					<>
						<div className="comment-container">
							<img
								src={comment.image || ANON_IMAGE}
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
							{comment.likers ? (
								<p className="upvotes" title={comment.likers.sort()}>
									{comment.upvotes}
								</p>
							) : (
								<p className="upvotes">{comment.upvotes}</p>
							)}
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
						<img src={ANON_IMAGE} alt="Avatar" className="avatar"></img>
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
