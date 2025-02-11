export default {
	frameguard: process.env.IS_GENERATOR !== "1",
	contentSecurityPolicy: {
		useDefaults: false,
		directives: {
			"default-src": [
				"'self'",
				"'unsafe-eval'",
				"'unsafe-inline'",
				"data:",
				"blob:",
			],
		},
	},
};
