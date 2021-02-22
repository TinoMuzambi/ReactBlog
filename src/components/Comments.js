import React from "react";

const Comments = () => {
	return (
		<div className="comments">
			<h1>Comments</h1>
			<div className="form-group">
				<img
					src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
					alt="Avatar"
				/>
				<form className="form">
					<textarea
						type="text"
						name="text"
						className="text"
						placeholder="Leave a comment"
						rows={5}
					/>
				</form>
			</div>
		</div>
	);
};

export default Comments;
