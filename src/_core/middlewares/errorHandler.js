export default function errorHandler() {
    return (err, req, res, next) => {
        const isAjax = req.xhr || req.headers.accept?.includes('application/json');

        console.error(`[${err.entity || 'Unknown'}] erreur sur ${err.method || req.method} ${err.route || req.originalUrl}`, err);

        // 1. Requête AJAX/FETCH → retourne JSON
        if (isAjax) {
            return res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || 'Une erreur est survenue.',
                entity: err.entity || null,
                route: err.route || null,
            });
        }

        // 2. Erreur générique (SSR)
        res.status(err.statusCode || 500).render('error', {
            layout: false,
            message: err.message || 'Une erreur est survenue',
            entity: err.entity || null,
            route: err.route || null,
        });
    }
};