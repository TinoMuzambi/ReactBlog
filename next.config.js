module.exports = {
	webpack5: true,
	env: {
		REACT_APP_STORYBLOK_KEY: process.env.REACT_APP_STORYBLOK_KEY,
		REACT_APP_MAIL_PASS: process.env.REACT_APP_MAIL_PASS,
		REACT_APP_FIREBASE_KEY: process.env.REACT_APP_FIREBASE_KEY,
		STORYBLOK_ENV: process.env.STORYBLOK_ENV,
	},
	rules: {
		"@next/next/no-img-element": "off",
	},
};
