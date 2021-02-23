import React from "react";
import firebase from "firebase";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

import comments from "../firebase/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = () => {
	return (
		<FirebaseAuthConsumer>
			{({ isSignedIn, user, providerId }) => {
				console.log(user, providerId);

				const signInWithGoogle = () => {
					if (!isSignedIn) {
						const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
						firebase.auth().signInWithPopup(googleAuthProvider);
					}
				};

				const signInAnon = (e) => {
					!isSignedIn && firebase.auth().signInAnonymously();
				};
				return (
					<div className="comments">
						<h1>Comments</h1>
						<div className="form-group">
							<div className="person">
								<img
									src={
										user?.photoURL ||
										"https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
									}
									alt="Avatar"
								/>
								<p className="user" onClick={signInWithGoogle}>
									{isSignedIn
										? user?.isAnonymous
											? "Anonymous"
											: user?.displayName
										: "Sign In"}
								</p>
								{!isSignedIn && (
									<p className="user" onClick={signInAnon}>
										{isSignedIn
											? user?.isAnonymous
												? "Anonymous"
												: user?.displayName
											: "Sign In Anon"}
									</p>
								)}
								{isSignedIn && (
									<p
										className="user"
										onClick={() => {
											firebase.auth().signOut();
										}}
									>
										Sign Out
									</p>
								)}
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
			}}
		</FirebaseAuthConsumer>
	);
};

export default Comments;
