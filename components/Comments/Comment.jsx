import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";
import CommentContent from "./CommentContent";
import {
	confirmDeleteOwnComments,
	confirmSignInDelete,
	confirmAnonDelete,
	getTopIDs,
	getSecondIDs,
	postToCommentsDB,
} from "../../utils/helpers";

const Comment = ({
	commentProp,
	user,
	comments,
	users,
	getData,
	setComments,
	url,
	db,
}) => {
	const [currComments, setCurrComments] = useState(commentProp);

	const confirmDelete = (id) => {
		// Custom alert for deleting a comment.
		confirmAlert({
			customUI: ({ onClose }) => {
				const timer = setTimeout(() => {
					onClose();
				}, 5000);

				return (
					<div className="confirm">
						<h1 className="title">Delete comment</h1>
						<p className="text">
							Are you sure you want to delete this comment?
						</p>
						<div className="buttons">
							<button
								onClick={() => {
									onClose();
									clearTimeout(timer);
									deleteHandler(id);
								}}
								className="yes"
							>
								Yes
							</button>
							<button
								onClick={() => {
									onClose();
									clearTimeout(timer);
								}}
								className="no"
							>
								Cancel
							</button>
						</div>
					</div>
				);
			},
		});
	};

	const deleteHandler = async (id) => {
		// Handler for deleting comment with given id.
		let owner = false;
		if (user) {
			const topIDs = getTopIDs(currComments);
			const secondIDs = getSecondIDs(currComments);

			if (topIDs.includes(id)) {
				let newComments = currComments;
				for (let i = 0; i < newComments?.comments?.length; i++) {
					if (newComments?.comments[i]?.id === id) {
						if (user.displayName === newComments?.comments[i]?.user) {
							owner = true;
							newComments.comments[i] = {
								...newComments?.comments[i],
								comment: "deleted",
							};
						} else {
							owner = false;
						}
					}
				}

				setCurrComments(newComments);
			} else if (secondIDs?.includes(id)) {
				let newComments = currComments?.comments;

				for (let i = 0; i < currComments?.comments?.length; i++) {
					for (let j = 0; j < currComments?.comments[i]?.replies?.length; j++) {
						if (currComments?.comments[i]?.replies[j]?.id === id) {
							if (
								user.displayName === currComments?.comments[i]?.replies[j]?.user
							) {
								owner = true;
								newComments[i].replies[j] = {
									...currComments?.comments[i]?.replies[j],
									comment: "deleted",
								};
							} else {
								owner = false;
								newComments[i].replies[j] = {
									...currComments?.comments[i]?.replies[j],
								};
							}
						} else {
							newComments[i].replies[j] = {
								...currComments?.comments[i]?.replies[j],
							};
						}
					}
				}

				const newItem = {
					blog_url: currComments.blog_url,
					comments: newComments,
				};
				setCurrComments(newItem);
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
								currComments?.comments[i]?.replies[j]?.replies[k]?.id === id
							) {
								if (
									user.displayName ===
									currComments?.comments[i]?.replies[j]?.replies[k]?.user
								) {
									owner = true;
									newComments[i].replies[j].replies[k] = {
										...currComments?.comments[i]?.replies[j]?.replies[k],
										comment: "deleted",
									};
								} else {
									owner = false;
									newComments[i].replies[j].replies[k] = {
										...currComments?.comments[i]?.replies[j]?.replies[k],
									};
								}
							} else {
								newComments[i].replies[j].replies[k] = {
									...currComments?.comments[i]?.replies[j]?.replies[k],
								};
							}
						}
					}
				}

				if (owner) {
					const newItem = {
						blog_url: currComments.blog_url,
						comments: newComments,
					};
					setCurrComments(newItem);
				}
			}
			if (owner) {
				let deleteComments = [];
				for (let i = 0; i < comments.length; i++) {
					if (comments[i].blog_url === url) {
						deleteComments[i] = currComments;
					} else {
						deleteComments[i] = comments[i];
					}
				}

				postToCommentsDB(deleteComments, getData, null, db);
			} else if (user.isAnonymous) {
				return confirmAnonDelete();
			} else {
				return confirmDeleteOwnComments();
			}
		} else {
			return confirmSignInDelete();
		}
	};

	return currComments.comments.map((comment) => (
		<div key={comment.id}>
			<CommentContent
				comment={comment}
				deleteHandler={confirmDelete}
				user={user}
				comments={comments}
				getData={getData}
				setComments={setComments}
				url={url}
				db={db}
				users={users}
			/>
			{comment?.replies?.map((reply) => (
				<div key={reply.id}>
					<CommentContent
						comment={reply}
						deleteHandler={confirmDelete}
						user={user}
						comments={comments}
						getData={getData}
						setComments={setComments}
						url={url}
						db={db}
						users={users}
					/>
					{reply?.replies?.map((replyTwo) => (
						<CommentContent
							comment={replyTwo}
							deleteHandler={confirmDelete}
							user={user}
							comments={comments}
							getData={getData}
							setComments={setComments}
							url={url}
							db={db}
							key={replyTwo.id}
							users={users}
						/>
					))}
				</div>
			))}
		</div>
	));
};

export default Comment;
