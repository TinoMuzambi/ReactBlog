import React from "react";
import { motion } from "framer-motion";
import CommentContent from "./CommentContent";

const Comment = ({ comment, length }) => {
	return (
		<motion.div className="comment" layout>
			<CommentContent comment={comment} />
			{comment.id !== length - 1 && <div className="underline"></div>}
		</motion.div>
	);
};

export default Comment;
