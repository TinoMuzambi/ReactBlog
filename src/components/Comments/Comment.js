import React, { useState } from "react";
import CommentContent from "./CommentContent";

const Comment = ({ commentProp }) => {
	const [currComments, setCurrComments] = useState(commentProp);

	const deleteHandler = (id) => {
		console.log(id);
		console.log("before", currComments);
		setCurrComments(
			currComments.comments.filter((comment) => comment.id !== id)
		);
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
