import React, { useState } from "react";
import CommentContent from "./CommentContent";

const Comment = ({ commentProp }) => {
	const [currComments, setCurrComments] = useState(commentProp);

	const deleteHandler = (id) => {
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