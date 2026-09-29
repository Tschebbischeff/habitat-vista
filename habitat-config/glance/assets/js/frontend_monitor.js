glanceLibRegister(
    "FEMON", "Monitor connection to URL via frontend requests.",
(dataset) => {
    /*const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const container = entry.target;
            if (entry.isIntersecting) {
                if (!container.querySelector(".widget-type-monitor")) {
                    const iframe = document.createElement("iframe");
                    iframe.src = container.dataset.libLiodSrc;
                    iframe.className = container.dataset.libLiodClasses;
                    iframe.classList.add("glance-lib-femon");
                    container.appendChild(iframe);
                    console.log("iframe loaded");
                }
            } else {
                const iframe = container.querySelector("iframe");
                if (iframe) {
                    iframe.remove();
                    console.log("iframe unloaded");
                }
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });*/
    document.querySelectorAll("div[data-lib-femon]").forEach(container => {
        // console.log("[GlanceLib/FEMON] Observing: ", elem);
        const config = {
            url: container.dataset.libFemonUrl,
            title: container.dataset.libFemonTitle || container.dataset.libFemonUrl,
            interval: parseInt(container.dataset.libFemonInterval, 10) || 30000,
            icon: container.dataset.libFemonIcon,
            hideCodes: (container.dataset.libFemonHideCodes || "")
                .split(",")
                .map((c) => parseInt(c.trim(), 10))
                .filter((c) => !isNaN(c))
        };
        container.classList.add("glance-lib-femon", "widget", "widget-type-monitor");
        container.innerHTML = `
            <div class="widget-content">
                <ul class="dynamic-columns list-gap-20 list-with-separator">
                    <div class="monitor-site flex items-center gap-15">
                        <img class="monitor-site-icon loaded finished-transition" src="${config.icon}" alt="" loading="lazy">
                        <div class="grow min-width-0">
                            <a class="size-h3 color-highlight text-truncate block" href="${config.url}" target="_blank" rel="noreferrer" title="${config.title}">${config.title}</a>
                            <ul class="monitor-site-status-text list-horizontal-text">
                            </ul>
                        </div>
                        <div class="monitor-site-status-icon">
                        </div>
                    </div>
                </ul>
            </div>
        `;
        const text = container.querySelector(".monitor-site-status-text");
        const icon = container.querySelector(".monitor-site-status-icon");
        const iconSuccess = `
            <svg fill="var(--color-positive)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M 10 18 a 8 8 0 1 0 0 -16 a 8 8 0 0 0 0 16 Z m 3.857 -9.809 a 0.75 0.75 0 0 0 -1.214 -0.882 l -3.483 4.79 l -1.88 -1.88 a 0.75 0.75 0 1 0 -1.06 1.061 l 2.5 2.5 a 0.75 0.75 0 0 0 1.137 -0.089 l 4 -5.5 Z" clip-rule="evenodd"></path>
            </svg>
        `;
        const iconError = `
            <svg fill="var(--color-negative)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M 8.485 2.495 c 0.673 -1.167 2.357 -1.167 3.03 0 l 6.28 10.875 c 0.673 1.167 -0.17 2.625 -1.516 2.625 H 3.72 c -1.347 0 -2.189 -1.458 -1.515 -2.625 L 8.485 2.495 Z M 10 5 a 0.75 0.75 0 0 1 0.75 0.75 v 3.5 a 0.75 0.75 0 0 1 -1.5 0 v -3.5 A 0.75 0.75 0 0 1 10 5 Z m 0 9 a 1 1 0 1 0 0 -2 a 1 1 0 0 0 0 2 Z" clip-rule="evenodd"></path>
            </svg>
        `;
        const check = async () => {
            console.log("[GlanceLib/LIOD] Checking: ", config.url);
            try {
                const fetchStart = performance.now();
                const res = await fetch(config.url, {
                    cache: "no-cache",
                    credentials: "include"
                });
                const fetchDuration = performance.now() - fetchStart;
                const status = res.status;
                if (config.hideCodes.includes(status)) {
                    container.style.display = "none";
                    return;
                }
                container.style.display = "";
                if (res.ok) {
                    icon.innerHTML = iconSuccess;
                    text.innerHTML = `
                        <li title="${status}">${res.statusText}</li>
                        <li>${Math.round(fetchDuration)}ms</li>
                    `;
                } else {
                    icon.innerHTML = iconError;
                    text.innerHTML = `
                        <li class="color-negative">${res.statusText}</li>
                    `;
                }
            } catch (err) {
                if (config.hideCodes.includes(0)) {
                    container.style.display = "none";
                    return;
                }
                console.log(`[GlanceLib/LIOD] Unknown Error checking '${config.url}': `, err);
                container.style.display = "";
                icon.innerHTML = iconError;
                text.innerHTML += `
                    <li class="color-negative">Unknown Error</li>
                `;
            }
        };
        check();
        setInterval(check, config.interval);
        // observer.observe(elem);
    });
});