glanceLibRegister(
    "FEMON", "Monitor connection to URL via frontend requests.",
(dataset) => {
    document.querySelectorAll("div[data-lib-femon]").forEach(container => {
        const config = {
            url: container.dataset.libFemonUrl,
            checkUrl: container.dataset.libFemonCheckUrl || container.dataset.libFemonUrl,
            title: container.dataset.libFemonTitle || container.dataset.libFemonUrl,
            interval: parseInt(container.dataset.libFemonInterval, 10) || 30000,
            icon: container.dataset.libFemonIcon || "",
            iconAutoInvert: (container.dataset.libFemonIconAutoInvert || "false") === "true",
            hideCodes: (container.dataset.libFemonHideCodes || "403")
                .split(",")
                .map((c) => parseInt(c.trim(), 10))
                .filter((c) => !isNaN(c)),
            okCodes: (container.dataset.libFemonOkCodes || "307, 418")
                .split(",")
                .map((c) => parseInt(c.trim(), 10))
                .filter((c) => !isNaN(c)),
        };
        container.classList.add("glance-lib-femon", "widget", "widget-type-monitor");
        container.innerHTML = `
            <div class="widget-content">
                <ul class="dynamic-columns list-gap-20 list-with-separator">
                    <div class="monitor-site flex items-center gap-15">
                        <img class="monitor-site-icon loaded finished-transition${config.iconAutoInvert ? " flat-icon" : ""}" src="${config.icon}" alt="" loading="lazy">
                        <div class="grow min-width-0">
                            <a class="size-h3 color-highlight text-truncate block" href="${config.url}" target="_blank" rel="noreferrer" title="${config.title}">${config.title}</a>
                            <ul class="monitor-site-status-text list-horizontal-text">
                                <li class="color-text-subdue">Fetching...</li>
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
            try {
                let fetchStart = performance.now();
                let res = await fetch(config.checkUrl, {
                    method: "HEAD",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "include",
                    redirect: "manual",
                });
                let fetchDuration = performance.now() - fetchStart;
                if (res.status == 405) {
                    fetchStart = performance.now();
                    res = await fetch(config.checkUrl, {
                        method: "GET",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "include",
                        redirect: "manual",
                    });
                    fetchDuration = performance.now() - fetchStart;
                }
                // console.log(`[GlanceLib/LIOD] Fetched '${config.checkUrl}': `, res);
                let status = res.status;
                let statusText = HTTP_STATUS_TEXTS[status] || "Unknown";
                if (["opaqueredirect"].includes(res.type)) {
                    status = 307;
                    statusText = "OK";
                }
                if (config.okCodes.includes(status)) {
                    statusText = "OK";
                }
                if (config.hideCodes.includes(status)) {
                    container.style.display = "none";
                    return;
                }
                container.style.display = "";
                if (status < 400 || config.okCodes.includes(status)) {
                    icon.innerHTML = iconSuccess;
                    text.innerHTML = `
                        <li title="${status}">${statusText}</li>
                        <li>${Math.round(fetchDuration)}ms</li>
                    `;
                } else {
                    icon.innerHTML = iconError;
                    text.innerHTML = `
                        <li class="color-negative" title="${status}">${statusText}</li>
                    `;
                }
            } catch (err) {
                console.log(`[GlanceLib/LIOD] Unknown Error checking '${config.checkUrl}': `, err);
                if (config.hideCodes.includes(0)) {
                    container.style.display = "none";
                    return;
                }
                container.style.display = "";
                icon.innerHTML = iconError;
                text.innerHTML = `
                    <li class="color-negative" title="${err.message}">ERROR</li>
                `;
            }
        };
        check();
        setInterval(check, config.interval);
    });
});