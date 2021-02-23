import React from "react";
const CommentForm = ({ sm }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form className={`form ${sm && "sm"}`} onSubmit={handleSubmit}>
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
