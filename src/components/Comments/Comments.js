import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import "firebase/firestore";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ url }) => {
	const [fetching, setFetching] = useState(true);
	const [comments, setComments] = useState([]);
	const [filteredComments, setFilteredComments] = useState([]);

	const commRef = useRef(null);
	const db = firebase.firestore();

	const getComments = async () => {
		let comms = [];
		await db
			.collection("comments")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					comms = doc.data().comments;
					console.log(comms);
				});
			});

		setComments(comms);
		setFetching(false);
	};

	useEffect(() => {
		getComments();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		setFilteredComments(comments.filter((comment) => comment.blog_url === url));
	}, [comments, url]);

	useEffect(() => {
		if (!fetching) {
			commRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [fetching]);

	if (fetching) {
		return "Fetching";
	}

	return (
		<FirebaseAuthConsumer>
			{({ isSignedIn, user }) => {
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
						<h1 className="title">Comments</h1>
						<div className="form-group" ref={commRef}>
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
							<CommentForm sm={false} user={user} />
						</div>
						{filteredComments[0].comments ? (
							filteredComments.map((comment) => (
								<div className="wrapper" key={comment.id}>
									<Comment commentProp={comment} user={user} />
								</div>
							))
						) : (
							<h2>A barren land. Be the first to comment!</h2>
						)}
					</div>
				);
			}}
		</FirebaseAuthConsumer>
	);
};

export default Comments;
