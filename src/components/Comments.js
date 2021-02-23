import React from "react";
import firebase from "firebase";

import comments from "../firebase/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = () => {
	const signInWithGoogle = () => {
		const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(googleAuthProvider);
	};
	return (
		<div className="comments">
			<h1>Comments</h1>
			<div className="form-group">
				<div className="person">
					<img
						src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
						alt="Avatar"
					/>
					<p className="user" onClick={signInWithGoogle}>
						Sign In/Sign Up
					</p>
				</div>
				<CommentForm sm={false} />
			</div>
			{comments.map((comment) => (
				<div className="wrapper" key={comment.id}>
					<Comment comment={comment} length={comments.length} />
				</div>
			))}
		</div>
	);
};

export default Comments;
