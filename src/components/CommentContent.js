import React, { useState } from "react";
import { motion } from "framer-motion";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

import CommentForm from "./CommentForm";

const CommentContent = ({ comment }) => {
	const [liked, setLiked] = useState(false);
	const [replying, setReplying] = useState(false);

	const like = () => {
		setLiked(!liked);
		if (!liked) {
			comment.upvotes++;
		} else {
			comment.upvotes--;
		}
	};

	const reply = () => {
		setReplying(!replying);
	};

	return (
		<div className="comment-content">
			<motion.div className="comment-container" layout>
				<img src={comment.image} alt="Avatar" className="avatar" />
				<div className="group">
					<div className="details">
						<h4 className="author">{comment.user}</h4>
						<h5 className="date">{comment.date.toLocaleString()}</h5>
					</div>
					<p className="text">{comment.comment}</p>
				</div>
			</motion.div>
			<motion.div className="actions" layout>
				<div className="like" onClick={like}>
					{liked ? <FcLike /> : <FcLikePlaceholder />}
				</div>
				<p className="upvotes">{comment.upvotes}</p>
				<p className="reply" onClick={reply}>
					Reply
				</p>
			</motion.div>
			{replying && (
				<motion.div className="form-group" layout>
					<CommentForm sm={true} />
				</motion.div>
			)}
		</div>
	);
};

export default CommentContent;
