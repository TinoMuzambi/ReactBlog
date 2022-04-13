import React from "react";
import emailjs, { init } from "emailjs-com";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";

export const ANON_IMAGE =
	"https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif";

export const MY_EMAIL = "tinomuzambi@gmail.com";

export const titleCase = (str: string): string => {
	// Convert string to title case.
	const newStr = str.toLowerCase().split(" ");
	for (let i = 0; i < str.length; i++) {
		newStr[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return newStr.join(" ");
};

export const executeScroll = (customRef: any) =>
	// Scroll to ref.
	customRef?.current.scrollIntoView({ behavior: "smooth" });

export const confirmDialog = (
	// Shows confirm dialog.
	button1Text: string,
	button2Text: string | null,
	button2Handler: Function | null,
	title: string,
	text: string
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
									if (button2Handler) button2Handler();
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
	updatedComments: any[],
	getData: Function,
	setCommentText: Function,
	db: any
) => {
	const commentsDBRef = db.collection("comments").doc("comments");

	await commentsDBRef.set({
		comments: updatedComments,
	});

	getData();
	setCommentText && setCommentText("");
};

export const postToUsersDB = async (updatedUsers: any[], db: any) => {
	const usersDBRef = db.collection("users").doc("users");
	usersDBRef.set({
		users: updatedUsers,
	});
};

export const getTopIDs = (comments: any) => {
	return comments.comments?.map((c: any) => c.id);
};

export const getSecondIDs = (comments: any) => {
	let secondIDs = [];
	for (let i = 0; i < comments.comments.length; i++) {
		for (let j = 0; j < comments.comments[i]?.replies?.length; j++) {
			secondIDs.push(comments.comments[i]?.replies[j]?.id);
		}
	}
	return secondIDs;
};

export const getNextLevel = (level: string) => {
	if (level === "zero") {
		return "one";
	} else if (level === "one") {
		return "two";
	} else return "two";
};

export const sendEmail = (
	target: string,
	user_name: string,
	blog_url: string,
	comment_body: string,
	level: string
) => {
	init(process.env.REACT_APP_MAIL_PASS as string);

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
