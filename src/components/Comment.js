import React from "react";
import CommentContent from "./CommentContent";

const Comment = ({ comment, length }) => {
	return (
		<div className="comment">
			<CommentContent comment={comment} indent={comment.level} />
			{comment?.replies?.map((reply) => (
				<>
					<CommentContent key={reply.id} comment={reply} indent={reply.level} />
					{reply?.replies?.map((replyTwo) => (
						<CommentContent
							key={replyTwo.id}
							comment={replyTwo}
							indent={replyTwo.level}
						/>
					))}
				</>
			))}
		</div>
	);
};

export default Comment;
