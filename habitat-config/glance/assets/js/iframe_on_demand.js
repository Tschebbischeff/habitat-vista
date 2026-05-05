console.log('[GlanceLib/LIOD] Library: "Load iFrame on demand".');

const glanceLibAfterLoad = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const container = entry.target;
            if (entry.isIntersecting) {
                if (!container.querySelector('iframe')) {
                    const iframe = document.createElement('iframe');
                    iframe.src = container.dataset.libLiodSrc;
                    iframe.className = container.dataset.libLiodClasses;
                    iframe.classList.add('glance-lib-liod');
                    container.appendChild(iframe);
                    console.log('iframe loaded');
                }
            } else {
                const iframe = container.querySelector('iframe');
                if (iframe) {
                    iframe.remove();
                    console.log('iframe unloaded');
                }
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    document.querySelectorAll('div[data-lib-liod]').forEach(elem => {
        console.log('[GlanceLib/LIOD] Observing: ', elem);
        elem.classList.add('glance-lib-liod')
        observer.observe(elem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("[GlanceLib/LIOD] Waiting for Glance page to fully load...");
    new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type !== "attributes") continue;
            if (mutation.attributeName !== "class") continue;
            if (mutation.target.classList.contains("content-ready")) {
                observer.disconnect();
                console.log('[GlanceLib/LIOD] Initializing...');
                glanceLibAfterLoad();
                console.log('[GlanceLib/LIOD] Initialized.');
            }
        }
    }).observe(document.querySelector("main#page"), {
        attributes: true
    });
});