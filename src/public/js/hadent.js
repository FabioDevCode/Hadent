window.Hadent = window.Hadent || {};

function initFlatpickr() {
    document.querySelectorAll('input[flatpickr="date"]').forEach(function(input) {
        flatpickr(input, {
            dateFormat: "d/m/Y",
            locale: "fr",
            disableMobile: true
        });
    });

    document.querySelectorAll('input[flatpickr="monthyear"]').forEach(function(input) {
        flatpickr(input, {
            locale: "fr",
            disableMobile: true,
            altInput: true,
            altFormat: "F Y",
            dateFormat: "m/Y",
            plugins: [
                new monthSelectPlugin({
                    shorthand: true,
                    dateFormat: "m/Y",
                    theme: "light"
                })
            ]
        });
    });

    document.querySelectorAll('input[flatpickr="year"]').forEach(function(input) {
        flatpickr(input, {
            dateFormat: "Y",
            disableMobile: true,
            locale: "fr",
            plugins: [
                yearSelectPlugin({
                    range: 13, // 10 ans avant / après
                    currentYear: 2030 // optionnel
                    // minYear: 1990,
                    // maxYear: 2050
                })
            ]
        });
    });

    document.querySelectorAll('input[flatpickr="datetime"]').forEach(function(input) {
        flatpickr(input, {
            enableTime: true,
            time_24hr: true,
            dateFormat: "d/m/Y H:i",
            locale: "fr",
            disableMobile: true
        });
    });

    document.querySelectorAll('input[flatpickr="time"]').forEach(function(input) {
        flatpickr(input, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            // altInput: true,
            // altFormat: "H\\hi",
            time_24hr: true,
            locale: "fr",
            disableMobile: true
        });
    });
}

function initInputmask() {
    const inputs = document.querySelectorAll('[data-mask]');
    inputs.forEach(input => {
        const type = input.dataset.mask;
        let maskConfig;

        switch (type) {
            case "email":
                maskConfig = { alias: "email" };
                break;
            case "phone":
                // Format téléphone FR : 06 12 34 56 78
                maskConfig = { mask: "99 99 99 99 99" };
                break;
            case "custom":
                // Exemple : "999-AAA"
                if (input.dataset.maskPattern) {
                    maskConfig = {
                        mask: input.dataset.maskPattern
                    };
                }
                break;
            default:
                console.warn("Type de masque inconnu :", type);
                return;
        }

        if (maskConfig) {
            Inputmask(maskConfig).mask(input);
        }
    });
}

Hadent.defaultInitializers = {
    flatpickr: initFlatpickr,
    inputMask: initInputmask
}

/**
 * Initialise les modules d'interface utilisateur (UI) disponibles, tels que Flatpickr ou Inputmask.
 *
 * Cette fonction permet :
 * - d'appeler tous les initialisateurs par défaut
 * - d'en désactiver certains via `disabled`
 * - de surcharger leur comportement via `overrides`
 * - ou de n'en appeler qu'une sélection via `only`
 *
 * @function
 * @param {Object} [options={}] - Options de configuration.
 * @param {Object.<string, Function>} [options.overrides={}] - Liste des initialisateurs à surcharger. Clé = nom du module (`"flatpickr"`, `"inputMask"`), valeur = fonction personnalisée.
 * @param {string[]} [options.disabled=[]] - Liste des initialisateurs à ignorer. Utile si certains modules ne doivent pas être initialisés sur une page.
 * @param {string[]} [options.only=null] - Liste optionnelle d'initialisateurs à exécuter exclusivement. Si renseignée, seuls les modules listés seront initialisés (même si non désactivés).
 *
 * @example
 * // Initialisation classique de tous les modules
 * Hadent.initUI();
 *
 * @example
 * // Désactiver l'initialisation de Flatpickr
 * Hadent.initUI({ disabled: ['flatpickr'] });
 *
 * @example
 * // Surcharger le comportement de Inputmask
 * Hadent.initUI({
 *   overrides: {
 *     inputMask: () => {
 *       console.log("Initialisation InputMask custom");
 *     }
 *   }
 * });
 *
 * @example
 * // Initialiser uniquement Flatpickr
 * Hadent.initUI({ only: ['flatpickr'] });
*/
Hadent.initUI = function({ overrides = {}, disabled = [], only = null } = {}) {
    const initializers = Hadent.defaultInitializers;

    for (const [key, fn] of Object.entries(initializers)) {
        if (only && !only.includes(key)) continue;
        if (disabled.includes(key)) continue;

        const initFn = overrides[key] || fn;

        try {
            initFn();
        } catch (e) {
            console.error(`Erreur lors de l'initialisation de "${key}"`, e);
        }
    }
}
