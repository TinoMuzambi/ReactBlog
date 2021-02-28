import React, { useState } from "react";
import CommentContent from "./CommentContent";

const Comment = ({ commentProp }) => {
	const [currComments, setCurrComments] = useState(commentProp);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure you finna delete?")) {
			console.log(id);
			console.log("before", currComments);
			const topIDs = currComments.comments.map((comment) => comment.id);
			const secondIDs = currComments.comments.map((comment) =>
				comment.replies.map((reply) => reply.id)
			)[0];
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
						newComments.push({
							...currComments?.comments[i],
							comment: "deleted",
						});
						// for (let j = 0; j < newComments?.length; j++) {
						// 	newComments[j].level = "zero";
						// 	for (let k = 0; k < newComments[j]?.replies?.length; k++) {
						// 		newComments[j].replies[k].level = "one";
						// 	}
						// }
					} else {
						newComments.push({
							...currComments?.comments[i],
						});
					}
				}
				// console.log(newComments);
				const newItem = {
					blog_url: currComments.blog_url,
					comments: newComments,
				};
				console.log(newItem);
				setCurrComments(newItem);
			} else if (secondIDs.includes(id)) {
				let newComments = currComments?.comments;
				// for (let i = 0; i < currComments?.comments?.length; i++) {
				// 	newComments[i].replies = [];
				// }

				for (let i = 0; i < currComments?.comments?.length; i++) {
					console.log(currComments?.comments[i]?.replies);
					for (let j = 0; j < currComments?.comments[i]?.replies?.length; j++) {
						if (currComments?.comments[i]?.replies[j]?.id === id) {
							newComments[i].replies[j] = {
								...currComments?.comments[i]?.replies[j],
								comment: "deleted",
							};
							// console.log(newComments);
						} else {
							newComments[i].replies[j] = {
								...currComments?.comments[i]?.replies[j],
							};
							// console.log("2", newComments);
						}
					}
					// for (let j = 0; j < newComments[i]?.replies?.length; j++) {
					// 	newComments[i].replies[j].level = "one";
					// }
				}
				const newItem = {
					blog_url: currComments.blog_url,
					comments: newComments,
				};
				setCurrComments(newItem);
			} else {
				// const newComments = currComments.comments.map((comment) =>
				// 	comment.replies.map((reply) =>
				// 		reply.replies.filter((replyTwo) => replyTwo.id !== id)
				// 	)
				// );
				// const newItem = {
				// 	blog_url: currComments.blog_url,
				// 	comments: newComments,
				// };
				// setCurrComments(newItem);
			}
		} else {
			console.log("Aight");
		}
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
