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
			// const newComments =
			setCurrComments(
				currComments.comments.filter((comment) => comment.id !== id)
			);
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
