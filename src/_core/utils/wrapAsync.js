export default function wrapAsync(fn) {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			// Ajouter contexte à l'erreur
			err.route = req.route?.path || req.originalUrl;
			err.entity = req.entity;
			err.method = req.method;
			next(err);
		}
	};
}
