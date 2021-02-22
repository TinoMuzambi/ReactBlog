import React from "react";

const CommentForm = () => {
	return (
		<form className="form">
			<textarea
				type="text"
				name="text"
				className="text"
				placeholder="Leave a comment"
			/>
			<input type="submit" value="Comment!" className="submit" />
		</form>
	);
};

export default CommentForm;
