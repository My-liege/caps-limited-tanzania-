document.addEventListener('DOMContentLoaded', () => {
    const logoLink = document.querySelector('.nav-brand a');
    const navHomeLink = document.querySelector('.nav-logo-link');
    const hero = document.querySelector('#hero');

    const scrollToHero = (e) => {
        e?.preventDefault?.();

        // Only scroll on pages that actually have the #hero element (e.g., LAND.HTML)
        if (hero) {
            hero.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    logoLink?.addEventListener('click', scrollToHero);
    navHomeLink?.addEventListener('click', scrollToHero);


    // Integrated Quote Modal (from form.html) on LAND.HTML
    const modal = document.getElementById('quoteModal');
    if (!modal) return;

    const openBtns = Array.from(document.querySelectorAll('.btn-open-quote'));
    const closeTargets = Array.from(modal.querySelectorAll('[data-close-modal="true"], .quote-modal__close'));
    const form = document.getElementById('quoteFormModal');
    const select = document.getElementById('serviceSelect');

    const closeModal = () => {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('quote-modal--open');
        document.body.classList.remove('no-scroll');
    };

    const openModal = (service) => {
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('quote-modal--open');
        document.body.classList.add('no-scroll');

        if (select && service) {
            const normalized = String(service).trim().toLowerCase();
            // Match by option value (we set option values in modal markup)
            const opt = Array.from(select.options).find((o) => String(o.value).trim().toLowerCase() === normalized);
            if (opt) {
                select.value = opt.value;
                opt.selected = true;
                return;
            }
            // Fallback match by visible text
            const opt2 = Array.from(select.options).find((o) => String(o.textContent).trim().toLowerCase() === normalized);
            if (opt2) {
                opt2.selected = true;
            }
        }
    };

    openBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const service = btn.getAttribute('data-default-service') || '';
            openModal(service);
        });
    });

    // Footer "Contact" link to open the quote modal
    const contactOpen = document.querySelector('[data-open-quote="true"]');
    contactOpen?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('');
    });


    closeTargets.forEach((el) => el.addEventListener('click', closeModal));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('quote-modal--open')) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            // remove e.preventDefault() once you have a backend endpoint
            // e.preventDefault();
        });
    }
});
