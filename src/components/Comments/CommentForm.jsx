import React, { useRef, useEffect } from "react";

const CommentForm = ({
	sm,
	editText,
	handleSubmit,
	commentText,
	setCommentText,
}) => {
	const textAreaRef = useRef(null);

	useEffect(() => {
		if (editText) {
			textAreaRef.current.value = editText;
		}
	}, [editText]);

	return (
		<form className={`form ${sm && "sm"}`} onSubmit={(e) => handleSubmit(e)}>
			<textarea
				type="text"
				name="text"
				className="text"
				placeholder="Leave a comment"
				ref={textAreaRef}
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
			/>
			<input type="submit" value="Comment" className="submit" />
		</form>
	);
};

export default CommentForm;
