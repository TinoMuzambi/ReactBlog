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
