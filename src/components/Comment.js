import React from "react";
import { motion } from "framer-motion";
import CommentContent from "./CommentContent";

const Comment = ({ comment, length }) => {
	const getReplies = () => {
		let replies = [];
		console.log("here");

		if (comment.replies) {
			while (comment.replies) {
				replies = comment.replies.map((reply) => (
					<CommentContent comment={reply} />
				));
			}
		}

		console.log(replies);
		return replies;
	};

	// const other = getReplies();

	return (
		<motion.div className="comment" layout>
			<CommentContent comment={comment} indent={comment.level} />
			{comment?.replies?.map((reply) => (
				<CommentContent key={reply.id} comment={reply} indent={reply.level} />
			))}
			{comment.id !== length - 1 && <div className="underline"></div>}
		</motion.div>
	);
};

export default Comment;
