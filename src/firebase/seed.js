/* eslint-disable no-plusplus */
import comments from "./comments";

export async function seedDatabase(firebase) {
	// eslint-disable-next-line prefer-const

	try {
		await firebase
			.firestore()
			.collection("comments")
			.doc("comments")
			.set(comments);
	} catch (error) {
		console.error(error);
	}
}
