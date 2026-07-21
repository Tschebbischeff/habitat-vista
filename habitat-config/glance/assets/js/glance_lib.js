console.log("[GlanceLib] Initializing.");

const REGISTERED_GLANCE_LIBS = {};

const glanceLibRegister = (name, description, onAfterLoad) => {
    if (onAfterLoad) {
        console.log(`[GlanceLib] Registered library '${name}' (${description}).`)
        REGISTERED_GLANCE_LIBS[name] = {
            dataset: document.currentScript.dataset,
            onAfterLoad
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("[GlanceLib] Waiting for Glance page to fully load...");
    new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type !== "attributes") continue;
            if (mutation.attributeName !== "class") continue;
            if (mutation.target.classList.contains("content-ready")) {
                observer.disconnect();
                for (const name in REGISTERED_GLANCE_LIBS) {
                    const onAfterLoad = REGISTERED_GLANCE_LIBS[name].onAfterLoad;
                    if (onAfterLoad) {
                        console.log(`[GlanceLib/${name}] Initializing...`);
                        onAfterLoad(REGISTERED_GLANCE_LIBS[name].dataset);
                        console.log(`[GlanceLib/${name}] Initialized.`);
                    }
                }
            }
        }
    }).observe(document.querySelector("main#page"), {
        attributes: true
    });
});