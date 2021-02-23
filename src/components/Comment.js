import React from "react";
import CommentContent from "./CommentContent";

const Comment = ({ comment }) => {
	console.log(comment);
	return (
		<div className="comment">
			{/* TODO: Fix nesting */}
			<CommentContent comments={comment} indent={comment.comments[0]?.level} />
			{comment?.comments.map((item) =>
				item?.replies?.map((reply) => (
					<>
						<CommentContent
							key={reply.id}
							comments={reply}
							indent={reply.level}
						/>
						{reply?.replies?.map((replyTwo) => (
							<CommentContent
								key={replyTwo.id}
								comments={replyTwo}
								indent={replyTwo.level}
							/>
						))}
					</>
				))
			)}
		</div>
	);
};

export default Comment;
