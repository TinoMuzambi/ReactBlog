import { FormEventHandler, JSX, MutableRefObject } from "react";

export interface WrapperProps {
	children: JSX.Element | JSX.Element[];
}

export interface MetaProps {
	title?: string;
	description?: string;
	keywords?: string;
	url?: string;
	image?: string;
}

export interface HomeProps {
	story: any;
}

export interface PlaceholderProps {
	componentName: string;
}

export interface blokProps {
	blok: any;
}

export interface PageProps {
	content: any;
}

type Labels = {
	previous: JSX.Element;
	next: JSX.Element;
};

export interface PaginationProps {
	pageSize: number;
	items: any[];
	onChangePage: Function;
	customLabels: Labels;
	customRef: MutableRefObject<null | HTMLDivElement>;
}

export interface MyCustomCSS extends React.CSSProperties {
	"--bg-image": string;
}

export interface CommentFormProps {
	sm: boolean;
	editText?: string;
	handleSubmit: FormEventHandler<HTMLFormElement>;
	commentText: string;
	setCommentText: Function;
}

export interface CommentContentProps {
	comment: CommentContentModel;
	deleteHandler: Function;
	user: UserModel;
	comments: any[];
	getData: Function;
	setComments: Function;
	url: string;
	db: any;
	users: UserModel[];
}

export interface CommentProps {
	commentProp: CommentModel;
	user: UserModel;
	comments: CommentModel[];
	users: UserModel[];
	getData: Function;
	setComments: Function;
	url: string;
	db: any;
}

export interface CommentsProps {
	url: string;
}

export interface CommentContentModel {
	comment: string;
	date: any;
	id: number;
	image: string;
	level: "zero" | "one" | "two";
	likers: string[];
	replies: CommentContentModel[];
	upvotes: number;
	user: string;
}

export interface CommentModel {
	blog_url: string;
	comments: CommentContentModel[];
}

export interface UserModel {
	email: string;
	id: number;
	image: string;
	role: "user" | "moderator" | "admin";
	liked_ids: number[];
	username: string;
	displayName: string;
	isAnonymous: boolean;
	photoURL: string;
}
