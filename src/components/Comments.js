import React from "react";
import { motion } from "framer-motion";

import comments from "../firebase/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = () => {
	return (
		<div className="comments">
			<h1>Comments</h1>
			<div className="form-group">
				<img
					src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
					alt="Avatar"
				/>
				<CommentForm sm={false} />
			</div>
			{comments.map((comment) => (
				<motion.div className="wrapper" key={comment.id} layout>
					<Comment comment={comment} length={comments.length} />
				</motion.div>
			))}
		</div>
	);
};

export default Comments;
