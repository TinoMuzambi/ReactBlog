module.exports = {
	webpack: (config, { isServer }) => {
		if (isServer) {
			require("./utils/generateSiteMap");
		}

		return config;
	},
	env: {
		REACT_APP_CONTENTFUL_KEY: process.env.REACT_APP_CONTENTFUL_KEY,
		REACT_APP_STORYBLOK_KEY: process.env.REACT_APP_STORYBLOK_KEY,
		REACT_APP_CONTENTFUL_KEY: process.env.REACT_APP_CONTENTFUL_KEY,
	},
};
