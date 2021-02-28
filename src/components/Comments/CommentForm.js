import React, { useRef, useEffect } from "react";
const CommentForm = ({ sm, editText }) => {
	const textAreaRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (editText) {
			textAreaRef.current.value = editText;
		}
	}, [editText]);

	return (
		<form className={`form ${sm && "sm"}`} onSubmit={handleSubmit}>
			<textarea
				type="text"
				name="text"
				className="text"
				placeholder="Leave a comment"
				ref={textAreaRef}
			/>
			<input type="submit" value="Comment!" className="submit" />
		</form>
	);
};

export default CommentForm;
