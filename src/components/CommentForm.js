import React from "react";

const CommentForm = () => {
	return (
		<form className="form">
			<textarea
				type="text"
				name="text"
				className="text"
				placeholder="Leave a comment"
				rows={5}
			/>
		</form>
	);
};

export default CommentForm;
