const comments = [
	{
		id: 0,
		user: "Tino Muzambi",
		image: "https://a.storyblok.com/f/105639/1338x1534/77f714ef7c/new_me.jpg",

		comment:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id explicabo similique dolore nobis nesciunt vero atque, accusamus temporibus dolorum tempore modi sint facere nihil quos suscipit, optio cumque, fugit sunt?",
		date: new Date(),
		upvotes: 1,
		replies: [
			{
				id: 3,
				user: "Tino 2",
				image:
					"https://a.storyblok.com/f/105639/1338x1534/77f714ef7c/new_me.jpg",

				comment:
					"Losciunt vero atque, accusamus temporibus dolorum tempore modi sint facere nihil quos suscipit, optio cumque, fugit sunt?",
				date: new Date(),
				upvotes: 100,
			},
		],
	},
	{
		id: 1,
		user: "Tino",
		image: "https://a.storyblok.com/f/105639/1338x1534/77f714ef7c/new_me.jpg",

		comment:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id explicabo similique dolore nobis nesciunt vero atque, accusamus temporibus dolorum tempore modi sint facere nihil quos suscipit, optio cumque, fugit sunt?",
		date: new Date(),
		upvotes: 40,
	},
	{
		id: 2,
		user: "Tino Muzambi",
		image: "https://a.storyblok.com/f/105639/1338x1534/77f714ef7c/new_me.jpg",

		comment:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id explicabo rum tempore modi sint facere nihil quos suscipit, optio cumque, fugit sunt?",
		date: new Date(),
		upvotes: 4,
	},
];

export default comments;
