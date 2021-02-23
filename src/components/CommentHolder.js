import React from "react";

import CommentContent from "./CommentContent";

const CommentHolder = ({ comments }) => {
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
