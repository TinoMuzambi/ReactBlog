import { useRef, useEffect, LegacyRef } from "react";
import { CommentFormProps } from "../../interfaces";

const CommentForm: React.FC<CommentFormProps> = ({
	sm,
	editText,
	handleSubmit,
	commentText,
	setCommentText,
}) => {
	const textAreaRef: LegacyRef<HTMLTextAreaElement> = useRef(null);

	useEffect(() => {
		if (editText && textAreaRef.current) {
			textAreaRef.current.value = editText;
		}
	}, [editText]);

	return (
		// Sm for smaller form for styling
		<form className={`form ${sm && "sm"}`} onSubmit={(e) => handleSubmit(e)}>
			<textarea
				name="text"
				className="text"
				placeholder="Leave a comment"
				ref={textAreaRef}
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
			/>
			<input type="submit" value="Comment" className="submit" />
		</form>
	);
};

export default CommentForm;
