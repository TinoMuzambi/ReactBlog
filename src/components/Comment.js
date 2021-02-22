import React, { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Comment = ({ comment, length }) => {
	const [liked, setLiked] = useState(false);

	const like = () => {
		setLiked(!liked);
		if (!liked) {
			comment.upvotes++;
		} else {
			comment.upvotes--;
		}
	};

	return (
		<div className="comment">
			<div className="container">
				<img src={comment.image} alt="Avatar" className="avatar" />
				<div className="group">
					<div className="details">
						<h4 className="author">{comment.user}</h4>
						<h5 className="date">{comment.date.toLocaleString()}</h5>
					</div>
					<p className="text">{comment.comment}</p>
				</div>
			</div>
			<div className="actions">
				<div className="like" onClick={like}>
					{liked ? <FcLike /> : <FcLikePlaceholder />}
				</div>
				<p className="upvotes">{comment.upvotes}</p>
			</div>
			{comment.id !== length - 1 && <div className="underline"></div>}
		</div>
	);
};

export default Comment;
