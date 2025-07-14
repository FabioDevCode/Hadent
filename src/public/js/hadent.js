window.Hadent = window.Hadent || {};

function addIconToInput(input, iconHTML) {
    if (
        !input ||
        !(input instanceof HTMLElement) ||
        !input.classList.contains('with-icon')
    ) return;
    if (input.parentElement.classList.contains('input-icon-wrapper')) return;

    // ".with-icon"

    const wrapper = document.createElement('div');
    wrapper.className = 'input-icon-wrapper';

    input.parentElement.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const temp = document.createElement('div');
    temp.innerHTML = iconHTML.trim();

    const iconElement = temp.firstChild;

    if (iconElement && iconElement instanceof HTMLElement) {
        iconElement.classList.add('input-icon');
        wrapper.appendChild(iconElement);
    }
};

function addPasswordToggleIcon(input) {
    if (
		!input ||
		!(input instanceof HTMLElement) ||
		input.type !== "password" ||
		!input.classList.contains("with-icon")
	) {
		return;
	}

	// Ne rien faire si déjà décoré
	if (input.parentElement.classList.contains("input-icon-wrapper")) return;

	// Crée un conteneur autour de l'input
	const wrapper = document.createElement("div");
	wrapper.className = "input-icon-wrapper";
	input.parentElement.insertBefore(wrapper, input);
	wrapper.appendChild(input);

	// Crée l'icône d'œil
	const icon = document.createElement("i");
	icon.className = "far fa-eye-slash input-icon-password";
	icon.style.cursor = "pointer";
	wrapper.appendChild(icon);

	// Gestion des événements pour toggle "voir / cacher"
	icon.addEventListener("mousedown", () => {
		input.type = "text";
		icon.classList.replace("fa-eye-slash", "fa-eye");
	});

	icon.addEventListener("mouseup", () => {
		input.type = "password";
		icon.classList.replace("fa-eye", "fa-eye-slash");
	});

	// Si on sort du bouton sans relâcher (ex : glissé), sécurise le retour
	icon.addEventListener("mouseleave", () => {
		if (input.type === "text") {
			input.type = "password";
			icon.classList.replace("fa-eye", "fa-eye-slash");
		}
	});
};




function initPasswordInputs() {
    document.querySelectorAll('input[type="password"]').forEach(function(input) {
        addPasswordToggleIcon(input);
    })
};

function initFlatpickr() {
    document.querySelectorAll('input[flatpickr="date"]').forEach(function(input) {
        addIconToInput(input, '<i class="far fa-calendar-alt"></i>');
        flatpickr(input, {
            dateFormat: "d/m/Y",
            locale: "fr",
            disableMobile: true
        });
    });

    document.querySelectorAll('input[flatpickr="monthyear"]').forEach(function(input) {
        addIconToInput(input, '<i class="far fa-calendar-alt"></i>');
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
        addIconToInput(input, '<i class="far fa-calendar-alt"></i>');
        flatpickr(input, {
            dateFormat: "Y",
            disableMobile: true,
            locale: "fr",
            plugins: [
                yearSelectPlugin()
            ]
        });
    });

    document.querySelectorAll('input[flatpickr="range"]').forEach(function (input) {
        addIconToInput(input, '<i class="far fa-calendar-alt"></i>');
        flatpickr(input, {
            mode: "range",
            dateFormat: "d/m/Y", // ou "Y-m-d" selon tes préférences
            locale: "fr",
            disableMobile: true,
            allowInput: true,
            defaultDate: input.value || null, // ex: "01/07/2025 à 10/07/2025"
        });
    });

    document.querySelectorAll('input[flatpickr="multipledate"]').forEach(function (input) {
        addIconToInput(input, '<i class="far fa-calendar-alt"></i>');
        flatpickr(input, {
            mode: "multiple",
            dateFormat: "d/m/Y", // ou "Y-m-d" selon ton besoin
            locale: "fr",
            disableMobile: true,
            allowInput: true,
            defaultDate: input.value || null,
        });
    });

    document.querySelectorAll('input[flatpickr="datetime"]').forEach(function(input) {
        addIconToInput(input, '<i class="far fa-calendar-alt"></i>');
        flatpickr(input, {
            enableTime: true,
            time_24hr: true,
            dateFormat: "d/m/Y H:i",
            locale: "fr",
            disableMobile: true
        });
    });

    document.querySelectorAll('input[flatpickr="time"]').forEach(function(input) {
        addIconToInput(input, '<i class="far fa-clock"></i>');
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
};

function initInputmask() {
    const inputs = document.querySelectorAll('[data-mask]');
    inputs.forEach(input => {
        const type = input.dataset.mask;
        let maskConfig;

        switch (type) {
            case "email":
                addIconToInput(input, '<i class="fas fa-at"></i>');
                maskConfig = { alias: "email" };
                break;
            case "phone":
                addIconToInput(input, '<i class="fas fa-phone"></i>');
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
};

Hadent.defaultInitializers = {
    flatpickr: initFlatpickr,
    inputMask: initInputmask,
    initPasswordInputs: initPasswordInputs
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
