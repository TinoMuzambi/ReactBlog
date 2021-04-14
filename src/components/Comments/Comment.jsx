import React, { useState } from "react";
import CommentContent from "./CommentContent";

const Comment = ({
	commentProp,
	user,
	comments,
	users,
	getComments,
	setComments,
	url,
	db,
}) => {
	const [currComments, setCurrComments] = useState(commentProp);

	const deleteHandler = async (id) => {
		let owner = false;
		if (user) {
			if (window.confirm("Are you sure you finna delete?")) {
				const topIDs = currComments.comments?.map((comment) => comment.id);
				let secondIDs = [];
				for (let i = 0; i < currComments.comments.length; i++) {
					for (let j = 0; j < currComments.comments[i]?.replies?.length; j++) {
						secondIDs.push(currComments.comments[i]?.replies[j]?.id);
					}
				}

				if (topIDs.includes(id)) {
					let newComments = [];
					for (let i = 0; i < currComments?.comments?.length; i++) {
						if (currComments?.comments[i]?.id === id) {
							if (user.displayName === currComments?.comments[i]?.user) {
								owner = true;
								newComments.push({
									...currComments?.comments[i],
									comment: "deleted",
								});
							} else {
								owner = false;
								newComments.push({
									...currComments?.comments[i],
								});
							}
						} else {
							newComments.push({
								...currComments?.comments[i],
							});
						}
					}
					const newItem = {
						blog_url: currComments.blog_url,
						comments: newComments,
					};
					setCurrComments(newItem);
				} else if (secondIDs?.includes(id)) {
					let newComments = currComments?.comments;

					for (let i = 0; i < currComments?.comments?.length; i++) {
						for (
							let j = 0;
							j < currComments?.comments[i]?.replies?.length;
							j++
						) {
							if (currComments?.comments[i]?.replies[j]?.id === id) {
								if (
									user.displayName ===
									currComments?.comments[i]?.replies[j]?.user
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

				const commentsDBRef = db.collection("comments").doc("comments");

				await commentsDBRef.set({
					comments: deleteComments,
				});
			} else {
				alert("You can only delete comments that you made.");
			}
		} else {
			alert("Please log in to delete.");
		}
	};

	return currComments.comments.map((comment) => (
		<div key={comment.id}>
			<CommentContent
				comment={comment}
				deleteHandler={deleteHandler}
				user={user}
				comments={comments}
				getComments={getComments}
				setComments={setComments}
				url={url}
				db={db}
				users={users}
			/>
			{comment?.replies?.map((reply) => (
				<div key={reply.id}>
					<CommentContent
						comment={reply}
						deleteHandler={deleteHandler}
						user={user}
						comments={comments}
						getComments={getComments}
						setComments={setComments}
						url={url}
						db={db}
						users={users}
					/>
					{reply?.replies?.map((replyTwo) => (
						<CommentContent
							comment={replyTwo}
							deleteHandler={deleteHandler}
							user={user}
							comments={comments}
							getComments={getComments}
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
