import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const titleCase = (str) => {
	str = str.toLowerCase().split(" ");
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(" ");
};

export const executeScroll = (customRef) =>
	customRef?.current.scrollIntoView({ behavior: "smooth" });

export const confirmCommentContent = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Blank comment</h1>
					<p className="text">Please make an actual comment.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmEditOwnComments = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Only edit own comments</h1>
					<p className="text">You can only edit comments that you made.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmDeleteOwnComments = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Only delete own comments</h1>
					<p className="text">You can only delete comments that you made.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmSignInDelete = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Sign in</h1>
					<p className="text">Please sign in to delete.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmSignInEdit = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Sign in</h1>
					<p className="text">Please sign in to edit.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmSignInReply = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Sign in</h1>
					<p className="text">Please sign in to reply.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmSignInLike = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Sign in</h1>
					<p className="text">Please sign in to like.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmSignInComment = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Sign in</h1>
					<p className="text">Please sign in before posting a comment.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};
export const confirmAnonLike = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Sign in</h1>
					<p className="text">Anonymous users can't like comments.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmAnonDelete = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Sign in</h1>
					<p className="text">Anonymous users can't delete comments.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmAnonEdit = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Sign in</h1>
					<p className="text">Anonymous users can't edit comments.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const confirmLikeOwnComments = () => {
	confirmAlert({
		customUI: ({ onClose }) => {
			setTimeout(() => {
				onClose();
			}, 5000);
			return (
				<div className="confirm">
					<h1 className="title">Liking own comments</h1>
					<p className="text">You can't like your own comments.</p>
					<div className="buttons">
						<button onClick={onClose} className="no">
							Ok
						</button>
					</div>
				</div>
			);
		},
	});
};

export const postToDB = async (
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
	setCommentText("");
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
