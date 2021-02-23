import React from "react";
const CommentForm = ({ sm }) => {
	return (
		<form className={`form ${sm && "sm"}`}>
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
