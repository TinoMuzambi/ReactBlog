import React, { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Moment from "react-moment";

import CommentForm from "./CommentForm";
import CommentContent from "./CommentContent";

const CommentHolder = ({ comments }) => {
	const [replying, setReplying] = useState(false);
	const [replying2, setReplying2] = useState(false);
	const [replying3, setReplying3] = useState(false);

	const like = (commentParam) => {
		commentParam.liked = !commentParam.liked;
		if (commentParam.liked) {
			commentParam.upvotes++;
		} else {
			commentParam.upvotes--;
		}
	};

	const replyHandler = (level) => {
		if (level === 0) {
			setReplying(!replying);
		} else if (level === 1) {
			setReplying2(!replying2);
		} else {
			setReplying3(!replying3);
		}
	};

	// console.log(comments);

	return comments.comments.map((comment) => (
		<>
			<CommentContent comment={comment} />
			{comment?.replies?.map((reply) => (
				<>
					<CommentContent comment={reply} />
					{reply?.replies?.map((replyTwo) => (
						<CommentContent comment={replyTwo} />
					))}
				</>
			))}
		</>
	));
};

export default CommentHolder;
