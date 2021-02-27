import React, { useState } from "react";
import CommentContent from "./CommentContent";

const Comment = ({ commentProp }) => {
	const [currComments, setCurrComments] = useState(commentProp);

	const deleteHandler = (id) => {
		console.log(id);
		console.log("before", currComments);
		const topIDs = currComments.comments.map((comment) => comment.id);
		const secondIDs = currComments.comments.map((comment) =>
			comment.replies.map((reply) => reply.id)
		);
		// const thirdIDs = currComments.comments.map(
		// 	(comment) =>
		// 		comment.replies.map((reply) =>
		// 			reply.replies.map((replyTwo) => replyTwo.id)
		// 		)[0]
		// );
		if (topIDs.includes(id)) {
			let newComments = [];
			for (let i = 0; i < currComments?.comments?.length; i++) {
				if (currComments?.comments[i]?.id === id) {
					newComments = currComments?.comments[i]?.replies;
					for (let j = 0; j < newComments?.length; j++) {
						newComments[j].level = "zero";
						for (let k = 0; k < newComments[j]?.replies?.length; k++) {
							newComments[j].replies[k].level = "one";
						}
					}
				}
			}
			const newItem = {
				blog_url: currComments.blog_url,
				comments: newComments,
			};
			setCurrComments(newItem);
		} else if (secondIDs.includes(id)) {
			setCurrComments(
				currComments.comments.filter((comment) =>
					comment.replies.filter((reply) => reply.id !== id)
				)
			);
		} else {
			setCurrComments(
				currComments.comments.filter((comment) =>
					comment.replies.filter((reply) =>
						reply.replies.filter((replyTwo) => replyTwo.id)
					)
				)
			);
		}
		console.log("after", currComments);
	};

	return currComments.comments.map((comment) => (
		<>
			<CommentContent comment={comment} deleteHandler={deleteHandler} />
			{comment?.replies?.map((reply) => (
				<>
					<CommentContent comment={reply} deleteHandler={deleteHandler} />
					{reply?.replies?.map((replyTwo) => (
						<CommentContent comment={replyTwo} deleteHandler={deleteHandler} />
					))}
				</>
			))}
		</>
	));
};

export default Comment;
