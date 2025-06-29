export default {
	contentSecurityPolicy: {
		useDefaults: false,
		directives: {
			"default-src": ["'self'", "'unsafe-eval'", "'unsafe-inline'", "data:", "blob:"],
		},
	},
};
