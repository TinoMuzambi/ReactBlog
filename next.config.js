// Preserve the deployed environment during the variable-name migration. Every
// value mapped here is a browser SDK identifier, never a server credential.
module.exports = {
	poweredByHeader: false,
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		];
	},
	env: {
		NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN:
			process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN ||
			process.env.REACT_APP_STORYBLOK_KEY,
		NEXT_PUBLIC_STORYBLOK_VERSION:
			process.env.NEXT_PUBLIC_STORYBLOK_VERSION ||
			process.env.STORYBLOK_ENV ||
			"published",
		NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:
			process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
			process.env.REACT_APP_MAIL_PASS,
		NEXT_PUBLIC_FIREBASE_API_KEY:
			process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
			process.env.REACT_APP_FIREBASE_KEY,
		NEXT_PUBLIC_ANALYTICS_ID:
			process.env.NEXT_PUBLIC_ANALYTICS_ID || process.env.ANALYTICS_CODE,
	},
};
