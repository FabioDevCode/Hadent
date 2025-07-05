function initFlatpickr() {
    document.querySelectorAll('input.flatpickr-date').forEach(function(input) {
        flatpickr(input, {
            dateFormat: "d/m/Y",
            locale: "fr",
            disableMobile: true
        });
    });

    document.querySelectorAll('input.flatpickr-datetime').forEach(function(input) {
        flatpickr(input, {
            enableTime: true,
            time_24hr: true,
            dateFormat: "d/m/Y H:i",
            locale: "fr",
            disableMobile: true
        });
    });

    document.querySelectorAll('input.flatpickr-timeonly').forEach(function(input) {
        flatpickr(input, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            locale: "fr",
            disableMobile: true
        });
    });
}