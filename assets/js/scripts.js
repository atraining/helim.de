var body = document.querySelector('body')
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active')
    body.classList.toggle('lock-scroll')
}

// Contact Form Handler
const HELM_FORM_ENDPOINT = 'https://submit-form.com/dI6PvQebZ';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('helmContactForm');
    if (!form) return;

    const relatedArticles = document.getElementById('helmRelatedArticles');

    // Show related articles for FRAGE form based on subject
    const subjectField = document.getElementById('helmSubject');
    if (subjectField && relatedArticles) {
        subjectField.addEventListener('change', function() {
            showRelatedArticles(this.value);
        });
    }

    // Real-time validation
    ['helmFirstName', 'helmLastName', 'helmStreet', 'helmHouseNumber', 'helmZip', 'helmCity', 'helmPhone', 'helmMessage'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => clearError(field));
        }
    });

    // Submit handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const btn = document.getElementById('helmSubmitBtn');
        btn.classList.add('loading');
        btn.disabled = true;

        try {
            const formData = {
                firstName: document.getElementById('helmFirstName').value,
                lastName: document.getElementById('helmLastName').value,
                name: `${document.getElementById('helmFirstName').value} ${document.getElementById('helmLastName').value}`,
                street: document.getElementById('helmStreet').value,
                houseNumber: document.getElementById('helmHouseNumber').value,
                zip: document.getElementById('helmZip').value,
                city: document.getElementById('helmCity').value,
                address: `${document.getElementById('helmStreet').value} ${document.getElementById('helmHouseNumber').value}, ${document.getElementById('helmZip').value} ${document.getElementById('helmCity').value}`,
                phone: document.getElementById('helmPhone').value,
                preferredContact: document.getElementById('helmPreferredContact') ? document.getElementById('helmPreferredContact').value : '',
                subject: document.getElementById('helmSubject') ? document.getElementById('helmSubject').value : '',
                message: document.getElementById('helmMessage').value,
                formType: document.getElementById('helmFormType').value,
                timestamp: new Date().toISOString()
            };

            // Add file upload URL if present
            const fileInput = document.getElementById('helmFile');
            if (fileInput && fileInput.value) {
                formData.fileUrl = fileInput.value;
            }

            const response = await fetch(HELM_FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('HTTP error');

            form.style.display = 'none';
            document.getElementById('helmSuccess').classList.add('show');

        } catch (error) {
            console.error('Error:', error);
            alert('Es gab einen Fehler. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    });
});

function validateField(field) {
    const val = field.value.trim();

    if (field.hasAttribute('required') && !val) {
        showError(field, 'Erforderlich');
        return false;
    }

    if (field.id === 'helmZip' && val && !/^\d{5}$/.test(val)) {
        showError(field, 'Bitte 5 Ziffern');
        return false;
    }

    clearError(field);
    return true;
}

function validateForm() {
    const errors = [];
    const required = [
        { id: 'helmFirstName', name: 'Vorname' },
        { id: 'helmLastName', name: 'Nachname' },
        { id: 'helmStreet', name: 'Straße' },
        { id: 'helmHouseNumber', name: 'Hausnummer' },
        { id: 'helmZip', name: 'PLZ' },
        { id: 'helmCity', name: 'Stadt' },
        { id: 'helmPhone', name: 'Telefon' },
        { id: 'helmPreferredContact', name: 'Kontaktart' },
        { id: 'helmMessage', name: 'Nachricht' }
    ];

    required.forEach(item => {
        const field = document.getElementById(item.id);
        if (!field || !field.value.trim()) {
            errors.push(item.name);
            if (field) showError(field, 'Erforderlich');
        }
    });

    const zip = document.getElementById('helmZip');
    if (zip && zip.value && !/^\d{5}$/.test(zip.value)) {
        if (!errors.includes('PLZ')) errors.push('PLZ');
        showError(zip, 'Bitte 5 Ziffern');
    }

    if (errors.length > 0) {
        alert('Bitte füllen Sie alle Pflichtfelder korrekt aus: ' + errors.join(', '));
        return false;
    }

    return true;
}

function showError(field, msg) {
    const group = field.closest('.helm-form-group');
    if (!group) return;

    group.classList.add('helm-has-error');
    const err = group.querySelector('.helm-error');
    if (err) {
        err.textContent = msg;
        err.classList.add('show');
    }

    field.classList.add('helm-shake');
    setTimeout(() => field.classList.remove('helm-shake'), 400);
}

function clearError(field) {
    const group = field.closest('.helm-form-group');
    if (!group) return;

    group.classList.remove('helm-has-error');
    const err = group.querySelector('.helm-error');
    if (err) err.classList.remove('show');
}

function showRelatedArticles(subject) {
    const articles = document.getElementById('helmRelatedArticles');
    if (!articles) return;

    const articleMap = {
        'miete': [
            { title: 'Mieterhöhung', url: '/anliegen/mieterhoehung/' },
            { title: 'Nebenkosten', url: '/anliegen/nebenkosten/' },
            { title: 'Betriebskosten prüfen', url: '/anliegen/betriebskosten-pruefen/' }
        ],
        'nebenkosten': [
            { title: 'Nebenkosten', url: '/anliegen/nebenkosten/' },
            { title: 'Betriebskosten prüfen', url: '/anliegen/betriebskosten-pruefen/' },
            { title: 'Mieterhöhung', url: '/anliegen/mieterhoehung/' }
        ],
        'kaution': [
            { title: 'Kaution zurückbekommen', url: '/anliegen/kaution/' },
            { title: 'Wohnungsübergabe', url: '/anliegen/wohnungsuebergabe/' },
            { title: 'Renovierung beim Auszug', url: '/anliegen/renovierung-auszug/' }
        ],
        'kuendigung': [
            { title: 'Kündigung der Mietwohnung', url: '/anliegen/kuendigung/' },
            { title: 'Wohnungsübergabe', url: '/anliegen/wohnungsuebergabe/' },
            { title: 'Kaution zurückbekommen', url: '/anliegen/kaution/' }
        ],
        'haustiere': [
            { title: 'Haustiere in der Mietwohnung', url: '/anliegen/haustiere/' },
            { title: 'Lärm und Nachbarn', url: '/anliegen/laerm-nachbarn/' }
        ],
        'nachbarn': [
            { title: 'Lärm und Nachbarn', url: '/anliegen/laerm-nachbarn/' },
            { title: 'Mietminderung', url: '/anliegen/mietminderung/' }
        ],
        'untervermietung': [
            { title: 'Untervermietung / Mitbewohner', url: '/anliegen/untervermietung/' },
            { title: 'Kündigung', url: '/anliegen/kuendigung/' }
        ]
    };

    const relatedList = articleMap[subject];
    if (relatedList) {
        let html = '<h4>Hilfreiche Artikel:</h4><ul>';
        relatedList.forEach(article => {
            html += `<li><a href="${article.url}">${article.title}</a></li>`;
        });
        html += '</ul>';
        articles.innerHTML = html;
        articles.style.display = 'block';
    } else {
        articles.style.display = 'none';
    }
}

// Phone Reveal for Emergency Number
class PhoneReveal {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-phone-reveal]');
            if (trigger) {
                e.preventDefault();
                this.revealPhone(trigger);
            }
        });
    }

    revealPhone(trigger) {
        const phone = '0163 431 4960';
        const displayId = 'emergency-phone-display';
        const display = document.getElementById(displayId);

        if (display) {
            display.innerHTML = `<a href="tel:${phone.replace(/\s/g, '')}" style="color: #ef4444; font-size: 2rem; font-weight: 700; text-decoration: none;">${phone}</a>`;
            trigger.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PhoneReveal();
});
