import React, { useState } from "react";
import CommentContent from "./CommentContent";

const Comment = ({
	commentProp,
	user,
	comments,
	getComments,
	setComments,
	url,
	db,
}) => {
	const [currComments, setCurrComments] = useState(commentProp);

	const deleteHandler = async (id) => {
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
						newComments.push({
							...currComments?.comments[i],
							comment: "deleted",
						});
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
					for (let j = 0; j < currComments?.comments[i]?.replies?.length; j++) {
						if (currComments?.comments[i]?.replies[j]?.id === id) {
							newComments[i].replies[j] = {
								...currComments?.comments[i]?.replies[j],
								comment: "deleted",
							};
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
								newComments[i].replies[j].replies[k] = {
									...currComments?.comments[i]?.replies[j]?.replies[k],
									comment: "deleted",
								};
							} else {
								newComments[i].replies[j].replies[k] = {
									...currComments?.comments[i]?.replies[j]?.replies[k],
								};
							}
						}
					}
				}

				const newItem = {
					blog_url: currComments.blog_url,
					comments: newComments,
				};
				setCurrComments(newItem);
			}
		}

		let newComments = [];
		for (let i = 0; i < comments.length; i++) {
			if (comments[i].blog_url === url) {
				newComments[i] = currComments;
			} else {
				newComments[i] = comments[i];
			}
		}

		const commentsDBRef = db.collection("comments").doc("comments");

		await commentsDBRef.set({
			comments: newComments,
		});
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
						/>
					))}
				</div>
			))}
		</div>
	));
};

export default Comment;
