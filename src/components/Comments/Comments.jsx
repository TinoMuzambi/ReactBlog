import React, { useEffect, useState } from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { AiOutlineReload } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import {
	confirmCommentContent,
	confirmSignInComment,
} from "../../utils/helpers";
import { firebase } from "../../firebase/config";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ url }) => {
	const [fetching, setFetching] = useState(true);
	const [comments, setComments] = useState([]);
	const [users, setUsers] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [filteredComments, setFilteredComments] = useState([]);

	const db = firebase.firestore();

	const getComments = async () => {
		setFetching(true);
		let comms = [];
		let dbUsers = [];
		await db
			.collection("comments")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					comms = doc.data().comments;
				});
			});
		await db
			.collection("users")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					dbUsers = doc.data().users;
				});
			});

		setComments(comms);
		setUsers(dbUsers);

		setFetching(false);
	};

	useEffect(() => {
		getComments();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		setFilteredComments(comments.filter((comment) => comment.blog_url === url));
	}, [comments, url]);

	if (fetching) {
		return (
			<div className="icon-wrapper large">
				<AiOutlineReload className="icon" />
			</div>
		);
	}

	return (
		<FirebaseAuthConsumer>
			{({ isSignedIn, user }) => {
				const signInWithGoogle = async () => {
					if (!isSignedIn) {
						const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
						await firebase.auth().signInWithPopup(googleAuthProvider);
					}
				};
				if (user) {
					if (!user.isAnonymous) {
						if (!users.find((u) => u.username === user.displayName)) {
							const newUser = {
								id: users[users.length - 1],
								image: user.photoURL,
								role: "user",
								liked_ids: [],
								username: user.displayName,
							};
							users[users.length - 1]++;

							const usersDBRef = db.collection("users").doc("users");

							usersDBRef.set({
								users: [newUser, ...users],
							});
						}
					}
				}

				const signInAnon = (e) => {
					!isSignedIn && firebase.auth().signInAnonymously();
				};

				const handleSubmit = async (e) => {
					e.preventDefault();
					if (user) {
						if (commentText.trim()) {
							const newComment = {
								id: comments[comments.length - 1],
								user: user.displayName || "Anonymous",
								image:
									user.photoURL ||
									"https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif",
								comment: commentText,
								date: new Date(),
								upvotes: 0,
								likers: [],
								level: "zero",
							};
							comments[comments.length - 1]++;

							let found = false;
							let newComments = comments;

							for (let i = 0; i < newComments.length; i++) {
								if (newComments[i]?.blog_url === url) {
									found = true;
									newComments[i].comments.unshift(newComment);
								}
							}
							if (!found) {
								newComments.unshift({
									blog_url: url,
									comments: [newComment],
								});
							}

							setComments(newComments);

							const commentsDBRef = db.collection("comments").doc("comments");

							await commentsDBRef.set({
								comments: comments,
							});

							getComments();
							setCommentText("");
						} else {
							return confirmCommentContent();
						}
					} else {
						return confirmSignInComment();
					}
				};
				return (
					<div className="comments">
						<h1 className="title">Comments</h1>
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
									{isSignedIn ? (
										user?.isAnonymous ? (
											"Anonymous"
										) : (
											user?.displayName
										)
									) : (
										<span className="google-span" title="Sign in with Google">
											<FcGoogle className="google-icon" /> Sign in
										</span>
									)}
								</p>
								{!isSignedIn && (
									<p className="user" onClick={signInAnon}>
										{isSignedIn ? (
											user?.isAnonymous ? (
												"Anonymous"
											) : (
												user?.displayName
											)
										) : (
											<span className="anon-span" title="Sign in anonymously">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 100 100"
													width="50px"
													height="50px"
												>
													<circle cx="13" cy="29" r="2" fill="#78a0cf" />
													<circle cx="77" cy="13" r="1" fill="#f1bc19" />
													<circle cx="50" cy="50" r="37" fill="#cee1f4" />
													<circle cx="83" cy="15" r="4" fill="#f1bc19" />
													<circle cx="87" cy="24" r="2" fill="#78a0cf" />
													<circle cx="81" cy="76" r="2" fill="#fbcd59" />
													<circle cx="15" cy="63" r="4" fill="#fbcd59" />
													<circle cx="25" cy="87" r="2" fill="#78a0cf" />
													<circle cx="20.5" cy="41.5" r="2.5" fill="#fff" />
													<circle cx="21" cy="67" r="1" fill="#f1bc19" />
													<circle cx="80" cy="34" r="1" fill="#fff" />
													<g>
														<path
															fill="#fff"
															d="M50,78.821c-0.095-0.001-4.596-0.073-7.925-3.367c-3.538-3.501-8.317-9.403-8.365-9.462 c-0.046-0.057-4.654-5.871-4.654-13.839V36.684c-0.051-0.451-1.022-9.041,6.705-11.226C39.771,24.324,44.829,23.7,50,23.7 s10.229,0.625,14.239,1.759c7.749,2.191,6.757,10.773,6.711,11.138l-0.006,15.556c0,7.968-4.608,13.782-4.655,13.839 c-0.047,0.059-4.827,5.96-8.364,9.461C54.596,78.748,50.095,78.82,50,78.821z"
														/>
														<path
															fill="#472b29"
															d="M50,24.4c5.109,0,10.098,0.615,14.049,1.732c7.134,2.017,6.248,10.04,6.207,10.377l-0.011,0.087 v0.088v15.469c0,7.704-4.455,13.345-4.499,13.398c-0.048,0.059-4.804,5.932-8.313,9.405c-3.132,3.099-7.395,3.165-7.428,3.165 c-0.043,0-4.306-0.066-7.437-3.165c-3.51-3.473-8.266-9.346-8.312-9.403c-0.045-0.056-4.5-5.697-4.5-13.4V36.684v-0.088 l-0.011-0.087c-0.043-0.34-0.969-8.348,6.207-10.377C39.902,25.015,44.891,24.4,50,24.4 M50,23 c-5.111,0-10.221,0.595-14.43,1.785c-8.417,2.38-7.215,11.899-7.215,11.899s0,7.139,0,15.469s4.81,14.279,4.81,14.279 s4.81,5.95,8.417,9.52S50,79.521,50,79.521s4.81,0,8.417-3.57s8.417-9.52,8.417-9.52s4.81-5.949,4.81-14.279s0-15.469,0-15.469 s1.202-9.52-7.215-11.899C60.221,23.595,55.111,23,50,23L50,23z"
														/>
														<path
															fill="#472b29"
															d="M49.869,55.785c-0.843,0-1.521-0.275-2.019-0.819c-0.773-0.846-0.92-2.163-0.811-3.035 c0.004-0.026,0.172-0.87,0.432-2.717c0.019-0.137,0.147-0.231,0.282-0.213c0.137,0.019,0.232,0.146,0.213,0.282 c-0.262,1.864-0.427,2.693-0.434,2.727c-0.074,0.598-0.017,1.847,0.687,2.617c0.42,0.46,1.015,0.673,1.772,0.654 c0.121-0.017,0.253,0.103,0.259,0.241c0.005,0.138-0.103,0.254-0.241,0.259C49.961,55.784,49.915,55.785,49.869,55.785z"
														/>
														<path
															fill="#472b29"
															d="M47.911,48.072c-0.011,0-0.022-0.001-0.033-0.002c-0.137-0.018-0.233-0.143-0.216-0.28 c0.115-0.887,0.242-1.929,0.375-3.137c0.015-0.137,0.138-0.235,0.276-0.221c0.138,0.015,0.236,0.139,0.221,0.276 c-0.135,1.211-0.261,2.256-0.376,3.146C48.142,47.98,48.035,48.072,47.911,48.072z"
														/>
														<path
															fill="#472b29"
															d="M48.304,43.074c-0.127,0-0.236-0.097-0.249-0.226c-0.116-1.189-0.494-2.308-1.123-3.324 c-0.073-0.117-0.037-0.271,0.081-0.344c0.117-0.073,0.271-0.037,0.344,0.081c0.67,1.083,1.073,2.273,1.196,3.539 c0.013,0.137-0.087,0.26-0.225,0.273C48.32,43.073,48.312,43.074,48.304,43.074z"
														/>
														<path
															fill="#472b29"
															d="M42.262,52.07c-0.073,0-0.146-0.032-0.196-0.094c-0.086-0.108-0.068-0.265,0.04-0.351 c1.131-0.9,1.848-1.679,1.854-1.687c0.094-0.102,0.251-0.109,0.354-0.016c0.102,0.093,0.109,0.251,0.016,0.353 c-0.03,0.033-0.749,0.814-1.912,1.74C42.372,52.052,42.317,52.07,42.262,52.07z"
														/>
														<path
															fill="#472b29"
															d="M35.493,54.957c-1.735,0-3.508-0.678-5.103-2.546c-0.089-0.105-0.077-0.263,0.028-0.353 c0.104-0.089,0.262-0.077,0.353,0.028c3.14,3.681,7.07,2.373,9.813,0.628c0.116-0.074,0.271-0.04,0.345,0.077 c0.074,0.117,0.04,0.271-0.077,0.345C39.317,54.112,37.429,54.957,35.493,54.957z"
														/>
														<path
															fill="#472b29"
															d="M64.375,54.956c-0.87,0-1.787-0.171-2.75-0.513c-0.13-0.046-0.198-0.189-0.151-0.319 c0.046-0.13,0.189-0.197,0.319-0.152c2.893,1.03,5.349,0.395,7.293-1.886c0.091-0.105,0.25-0.117,0.353-0.028 c0.105,0.09,0.118,0.247,0.028,0.352C68.021,54.105,66.315,54.956,64.375,54.956z"
														/>
														<path
															fill="#472b29"
															d="M59.995,53.681c-0.041,0-0.082-0.01-0.12-0.031c-2.495-1.364-4.273-3.294-4.348-3.375 c-0.093-0.102-0.086-0.26,0.016-0.353c0.103-0.094,0.26-0.087,0.354,0.016c0.018,0.019,1.8,1.952,4.219,3.274 c0.121,0.066,0.166,0.218,0.099,0.339C60.169,53.634,60.083,53.681,59.995,53.681z"
														/>
														<path
															fill="#472b29"
															d="M54.426,63.457h-8.996c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h8.996 c0.276,0,0.5,0.224,0.5,0.5S54.703,63.457,54.426,63.457z"
														/>
														<path
															fill="#472b29"
															d="M40.02,64.624c-2.691-0.857-4.361-3.467-6.13-6.23l-0.1-0.157 c-0.075-0.116-0.041-0.271,0.076-0.345c0.115-0.075,0.27-0.041,0.345,0.076l0.101,0.157c1.793,2.802,3.341,5.221,5.86,6.022 L40.02,64.624z"
														/>
														<path
															fill="#472b29"
															d="M50,65.92c0,0-0.001,0-0.001,0c-0.043,0-4.313-0.036-7.973-0.785 c-0.135-0.028-0.222-0.16-0.195-0.295c0.028-0.135,0.157-0.223,0.295-0.195c3.611,0.738,7.833,0.774,7.875,0.775 c0.138,0.001,0.25,0.114,0.249,0.252C50.249,65.809,50.137,65.92,50,65.92z"
														/>
														<path
															fill="#472b29"
															d="M55.854,65.432c-0.123,0-0.229-0.09-0.247-0.215c-0.02-0.137,0.076-0.263,0.212-0.283 c1.469-0.208,2.736-0.473,3.767-0.788c2.625-0.803,4.236-3.223,6.102-6.025l0.105-0.158c0.077-0.115,0.233-0.146,0.347-0.069 c0.115,0.076,0.146,0.232,0.069,0.347l-0.105,0.157c-1.839,2.762-3.576,5.37-6.371,6.226c-1.055,0.323-2.348,0.594-3.843,0.805 C55.877,65.431,55.865,65.432,55.854,65.432z"
														/>
														<path
															fill="#472b29"
															d="M50,65.92c-0.137,0-0.249-0.111-0.25-0.248c-0.001-0.138,0.11-0.251,0.248-0.252 c0.019,0,1.876-0.016,4.116-0.26c0.135-0.015,0.261,0.084,0.276,0.221c0.015,0.137-0.084,0.261-0.221,0.276 c-2.267,0.247-4.148,0.263-4.167,0.263C50.001,65.92,50,65.92,50,65.92z"
														/>
														<path
															fill="#472b29"
															d="M44.86,43.538c0,0-1.142-2.285-4.569-2.285c-3.427,0-4.569,2.285-4.569,2.285 S39.148,45.823,44.86,43.538z"
														/>
														<path
															fill="#472b29"
															d="M39.941,45.058c-2.793,0-4.398-1.039-4.497-1.104c-0.21-0.14-0.283-0.414-0.17-0.64 c0.052-0.104,1.323-2.561,5.017-2.561c3.693,0,4.964,2.457,5.016,2.561c0.063,0.125,0.07,0.271,0.02,0.401 s-0.152,0.235-0.282,0.287C43.068,44.793,41.353,45.058,39.941,45.058z M36.446,43.361c1.011,0.469,3.679,1.34,7.638-0.064 c-0.508-0.595-1.654-1.543-3.793-1.543C38.081,41.753,36.926,42.775,36.446,43.361z"
														/>
														<path
															fill="#472b29"
															d="M47.43,55.961l-1.207,1.811c-0.495,0.742-1.327,1.188-2.219,1.188h-2.951 c-0.839,0-1.63-0.395-2.134-1.067l-2.627-3.502l-1.428,0.286l2.947,5.214c0.473,0.837,1.36,1.355,2.322,1.355h5.335 c0.707,0,1.386-0.281,1.886-0.781L50,57.817v-1.713L47.43,55.961z"
														/>
														<path
															fill="#472b29"
															d="M50,77.379c-5.712-5.854,0-9.281-2.856-11.852L50,65.813V77.379z"
														/>
														<path
															fill="#472b29"
															d="M45.904,35.421c0,0-8.794-6.571-13.039,0.657c1.819-1.314,5.003-3.121,11.826,0.986 C46.662,38.214,47.117,36.407,45.904,35.421z"
														/>
														<path
															fill="#472b29"
															d="M32.865,45.943c-0.033,0-0.067-0.007-0.099-0.021c-0.126-0.055-0.184-0.201-0.13-0.327 c0.028-0.066,0.719-1.61,3.465-2.16c0.128-0.027,0.267,0.06,0.294,0.196c0.027,0.135-0.061,0.267-0.196,0.294 c-2.468,0.494-3.098,1.854-3.104,1.868C33.053,45.887,32.961,45.943,32.865,45.943z"
														/>
														<path
															fill="#472b29"
															d="M35.556,43.805c-0.659,0-2.111-0.187-3.046-1.707c-0.072-0.118-0.036-0.272,0.082-0.344 c0.116-0.072,0.271-0.036,0.344,0.082c1.038,1.688,2.819,1.464,2.894,1.454c0.138-0.023,0.262,0.076,0.282,0.213 s-0.075,0.263-0.212,0.282C35.879,43.788,35.753,43.805,35.556,43.805z"
														/>
														<path
															fill="#472b29"
															d="M49.989,55.785c-0.046,0-0.093-0.001-0.14-0.003c-0.138-0.005-0.246-0.121-0.241-0.259 c0.005-0.138,0.134-0.248,0.259-0.241c0.753,0.023,1.351-0.193,1.771-0.653c0.704-0.77,0.762-2.019,0.685-2.636 c-0.001-0.003-0.435-2.193-1-7.286c-0.222-1.994,0.175-3.827,1.178-5.447c0.073-0.118,0.227-0.154,0.344-0.081 c0.117,0.073,0.153,0.227,0.081,0.344c-0.943,1.523-1.315,3.249-1.106,5.129c0.563,5.066,0.992,7.24,0.996,7.261 c0.112,0.89-0.036,2.208-0.809,3.053C51.51,55.51,50.832,55.785,49.989,55.785z"
														/>
														<path
															fill="#472b29"
															d="M55.14,56.603c-0.074,0-0.148-0.016-0.219-0.051c-0.249-0.121-0.351-0.421-0.23-0.669 c0.123-0.252,0.107-0.346,0.107-0.347c0.004,0.009-0.068-0.029-0.296-0.029c-0.26,0-0.73,0.048-1.556,0.265 c-0.039,0.01-0.096,0.025-0.164,0.035c-0.587,0.242-1.007,0.407-1.307,0.52c-0.931,0.351-2.002,0.365-2.952,0.036 c-0.331-0.115-0.798-0.29-1.456-0.56c-0.039-0.007-0.079-0.016-0.122-0.028c-1.327-0.372-1.69-0.257-1.763-0.219 c0.014,0.014,0.025,0.118,0.126,0.325c0.121,0.248,0.019,0.548-0.23,0.669c-0.245,0.121-0.547,0.019-0.668-0.23 c-0.287-0.588-0.287-1.061,0.001-1.406c0.491-0.589,1.59-0.423,2.563-0.168c0.079-0.009,0.163,0.003,0.241,0.036l0,0 c0.758,0.315,1.28,0.512,1.636,0.635c0.729,0.253,1.559,0.241,2.271-0.027c0.333-0.126,0.817-0.317,1.519-0.609c0,0,0,0,0,0 c0.085-0.035,0.174-0.046,0.262-0.033c1.074-0.268,2.187-0.423,2.683,0.181c0.283,0.346,0.284,0.813,0.002,1.39 C55.503,56.5,55.325,56.603,55.14,56.603z"
														/>
														<path
															fill="#472b29"
															d="M54.426,63.457h-8.996c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h8.996 c0.276,0,0.5,0.224,0.5,0.5S54.703,63.457,54.426,63.457z"
														/>
														<path
															fill="#472b29"
															d="M54.998,43.538c0,0,1.142-2.285,4.569-2.285s4.569,2.285,4.569,2.285S60.709,45.823,54.998,43.538z"
														/>
														<path
															fill="#472b29"
															d="M59.916,45.058c-1.412,0-3.127-0.265-5.104-1.056c-0.13-0.052-0.232-0.156-0.282-0.287 c-0.05-0.131-0.042-0.276,0.02-0.401c0.052-0.104,1.323-2.561,5.017-2.561s4.964,2.457,5.017,2.561 c0.113,0.226,0.04,0.5-0.17,0.64C64.314,44.02,62.708,45.058,59.916,45.058z M55.774,43.296c3.93,1.391,6.623,0.523,7.637,0.061 c-0.479-0.588-1.629-1.604-3.844-1.604C57.428,41.753,56.282,42.701,55.774,43.296z"
														/>
														<path
															fill="#472b29"
															d="M52.427,55.961l1.207,1.811c0.495,0.742,1.327,1.188,2.219,1.188h2.951 c0.839,0,1.63-0.395,2.134-1.067l2.627-3.502l1.428,0.286l-2.947,5.214c-0.473,0.837-1.36,1.355-2.322,1.355h-5.335 c-0.707,0-1.386-0.281-1.886-0.781l-2.646-2.646v-1.713L52.427,55.961z"
														/>
														<path
															fill="#472b29"
															d="M49.857,77.379c5.712-5.854,0-9.281,2.856-11.852l-2.856,0.286V77.379z"
														/>
														<path
															fill="#472b29"
															d="M53.953,35.421c0,0,8.794-6.571,13.039,0.657c-1.819-1.314-5.003-3.121-11.826,0.986 C53.195,38.214,52.74,36.407,53.953,35.421z"
														/>
														<path
															fill="#472b29"
															d="M66.992,45.944c-0.097,0-0.188-0.056-0.229-0.15c-0.014-0.03-0.651-1.377-3.104-1.867 c-0.136-0.027-0.224-0.159-0.196-0.294c0.027-0.136,0.163-0.223,0.294-0.196c2.746,0.549,3.437,2.094,3.465,2.16 c0.054,0.127-0.004,0.274-0.131,0.328C67.059,45.937,67.025,45.944,66.992,45.944z"
														/>
														<path
															fill="#472b29"
															d="M64.301,43.805c-0.197,0-0.323-0.017-0.343-0.02c-0.137-0.02-0.231-0.146-0.212-0.282 c0.019-0.136,0.141-0.235,0.282-0.213c0.073,0.01,1.855,0.234,2.894-1.454c0.073-0.118,0.229-0.154,0.344-0.082 c0.118,0.072,0.154,0.226,0.082,0.344C66.413,43.618,64.96,43.805,64.301,43.805z"
														/>
														<path
															fill="#472b29"
															d="M44.859,56.353c-0.064,0-0.128-0.024-0.177-0.073c-0.953-0.952-1.251-2.022-0.841-3.011 c0.476-1.15,1.865-1.985,3.303-1.985c0.138,0,0.25,0.112,0.25,0.25s-0.112,0.25-0.25,0.25c-1.244,0-2.438,0.705-2.841,1.676 c-0.332,0.802-0.079,1.655,0.733,2.466c0.098,0.098,0.098,0.256,0,0.354C44.987,56.329,44.923,56.353,44.859,56.353z"
														/>
														<g>
															<path
																fill="#472b29"
																d="M55.04,56.353c-0.062,0-0.125-0.023-0.173-0.069c-0.1-0.095-0.103-0.254-0.008-0.354 c0.784-0.82,1.025-1.716,0.68-2.524c-0.402-0.94-1.53-1.622-2.683-1.622c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25 c1.344,0,2.666,0.81,3.143,1.925c0.249,0.581,0.478,1.753-0.778,3.067C55.171,56.327,55.105,56.353,55.04,56.353z"
															/>
														</g>
														<g>
															<path
																fill="#472b29"
																d="M58.287,72.334c-0.049,0-0.099-0.014-0.142-0.044c-0.114-0.079-0.142-0.234-0.063-0.348 c0.38-0.549,0.785-1.117,1.205-1.706c0.918-1.287,1.868-2.618,2.798-4.084c0.074-0.117,0.229-0.151,0.345-0.077 c0.117,0.074,0.151,0.229,0.077,0.345c-0.937,1.479-1.891,2.815-2.813,4.107c-0.418,0.586-0.822,1.153-1.201,1.7 C58.444,72.296,58.366,72.334,58.287,72.334z"
															/>
														</g>
														<g>
															<path
																fill="#472b29"
																d="M41.811,72.269c-0.077,0-0.153-0.036-0.202-0.103c-0.393-0.54-0.811-1.097-1.245-1.675 c-0.96-1.28-1.953-2.603-2.932-4.071c-0.077-0.115-0.045-0.27,0.069-0.347c0.113-0.076,0.27-0.046,0.347,0.069 c0.971,1.456,1.96,2.774,2.916,4.048c0.435,0.58,0.855,1.139,1.249,1.68c0.081,0.112,0.057,0.268-0.055,0.349 C41.913,72.253,41.862,72.269,41.811,72.269z"
															/>
														</g>
													</g>
												</svg>{" "}
												Sign in
											</span>
										)}
									</p>
								)}
								{isSignedIn && (
									<p
										className="user"
										onClick={() => {
											firebase.auth().signOut();
										}}
									>
										Sign out
									</p>
								)}
							</div>
							<CommentForm
								sm={false}
								user={user}
								handleSubmit={handleSubmit}
								commentText={commentText}
								setCommentText={setCommentText}
							/>
						</div>
						{filteredComments[0]?.comments?.length ? (
							filteredComments.map((comment, index) => (
								<div className="wrapper" key={index}>
									<Comment
										commentProp={comment}
										user={user}
										comments={comments}
										users={users}
										getComments={getComments}
										setComments={setComments}
										url={url}
										db={db}
									/>
								</div>
							))
						) : (
							<h2 className="no-blogs">
								A barren land. Be the first to comment!
							</h2>
						)}
					</div>
				);
			}}
		</FirebaseAuthConsumer>
	);
};

export default Comments;
