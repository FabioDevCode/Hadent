export default function errorHandler() {
    console.error(`[${err.entity}] erreur sur ${err.method} ${err.route}`, err);

    // Exemple : redirection spécifique selon entité et route
    if (err.entity === 'user' && err.route?.includes('/create')) {
        // Si tu utilises un système de flash messages (ex: connect-flash)
        if (req.flash) req.flash('error', 'Erreur lors de la création utilisateur');
        return res.redirect(`/${err.entity}/create`);
    }

    // Gestion d'erreur générique : rendu d'une page d'erreur
    res.status(err.statusCode || 500).render('error', {
        message: err.message || 'Une erreur est survenue',
        error: err,
        entity: err.entity,
        route: err.route
    });
};