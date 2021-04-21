import React from "react";
import emailjs, { init } from "emailjs-com";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";

export const ANON_IMAGE =
	"https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif";

export const MY_EMAIL = "tinomuzambi@gmail.com";

export const titleCase = (str) => {
	// Convert string to title case.
	str = str.toLowerCase().split(" ");
	for (let i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(" ");
};

export const executeScroll = (customRef) =>
	// Scroll to ref.
	customRef?.current.scrollIntoView({ behavior: "smooth" });

export const confirmDialog = (
	// Shows confirm dialog.
	button1Text,
	button2Text,
	button2Handler,
	title,
	text
) => {
	if (button2Text) {
		confirmAlert({
			customUI: ({ onClose }) => {
				const timer = setTimeout(() => {
					onClose();
				}, 5000);

				return (
					<div className="confirm">
						<h1 className="title">{title}</h1>
						<p className="text">{text}</p>
						<div className="buttons">
							<button
								onClick={() => {
									onClose();
									clearTimeout(timer);
									button2Handler();
								}}
								className="yes"
							>
								{button1Text}
							</button>
							<button
								onClick={() => {
									onClose();
									clearTimeout(timer);
								}}
								className="no"
							>
								{button2Text}
							</button>
						</div>
					</div>
				);
			},
		});
	} else {
		confirmAlert({
			customUI: ({ onClose }) => {
				const timer = setTimeout(() => {
					onClose();
				}, 5000);
				return (
					<div className="confirm">
						<h1 className="title">{title}</h1>
						<p className="text">{text}</p>
						<div className="buttons">
							<button
								onClick={() => {
									onClose();
									clearTimeout(timer);
								}}
								className="no"
							>
								{button1Text}
							</button>
						</div>
					</div>
				);
			},
		});
	}
};

export const confirmCommentContent = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Blank comment",
		"Please make an actual comment."
	);
};

export const confirmEditOwnComments = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Only edit own comments",
		"You can only edit comments that you made."
	);
};

export const confirmDeleteOwnComments = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Only delete own comments",
		"You can only delete comments that you made."
	);
};

export const confirmSignInDelete = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Sign in",
		"Please sign in to delete comments."
	);
};

export const confirmSignInEdit = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Sign in",
		"Please sign in to edit comments."
	);
};

export const confirmSignInReply = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Sign in",
		"Please sign in to reply to comments."
	);
};

export const confirmSignInLike = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Sign in",
		"Please sign in to like comments."
	);
};

export const confirmSignInComment = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Sign in",
		"Please sign in to post a comment."
	);
};
export const confirmAnonLike = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Sign in",
		"Anonymous users can't like comments."
	);
};

export const confirmAnonDelete = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Sign in",
		"Anonymous users can't delete comments."
	);
};

export const confirmAnonEdit = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Sign in",
		"Anonymous users can't edit comments."
	);
};

export const confirmLikeOwnComments = () => {
	confirmDialog(
		"Ok",
		null,
		null,
		"Liking own comments",
		"You can't like your own comments."
	);
};

export const postToCommentsDB = async (
	updatedComments,
	getData,
	setCommentText,
	db
) => {
	const commentsDBRef = db.collection("comments").doc("comments");

	await commentsDBRef.set({
		comments: updatedComments,
	});

	getData();
	setCommentText && setCommentText("");
};

export const postToUsersDB = async (updatedUsers, db) => {
	const usersDBRef = db.collection("users").doc("users");
	usersDBRef.set({
		users: updatedUsers,
	});
};

export const getTopIDs = (comments) => {
	return comments.comments?.map((c) => c.id);
};

export const getSecondIDs = (comments) => {
	let secondIDs = [];
	for (let i = 0; i < comments.comments.length; i++) {
		for (let j = 0; j < comments.comments[i]?.replies?.length; j++) {
			secondIDs.push(comments.comments[i]?.replies[j]?.id);
		}
	}
	return secondIDs;
};

export const getNextLevel = (level) => {
	if (level === "zero") {
		return "one";
	} else if (level === "one") {
		return "two";
	} else return "two";
};

export const sendEmail = (target, user_name, blog_url, comment_body, level) => {
	init(process.env.REACT_APP_MAIL_PASS);

	const templateParams = {
		to_mail: target,
		user: user_name,
		blog_url: "https://blog.tinomuzambi.com/blogs/" + blog_url,
		comment: comment_body,
	};

	emailjs
		.send(
			"service_w0jctc8",
			level === "zero" ? "template_s173dla" : "template_27dkvq6",
			templateParams
		)
		.then();
};
