const currentScript = document.currentScript.dataset;

glanceLibRegister(
    "UserMenu", "Displays user menu on the far right of the nav bar",
(dataset) => {
    const navBar = document.querySelector("nav.nav");
    if (navBar) {
        const userMenu = document.createElement("div");
        userMenu.className = "glance-lib-usermenu";
        userMenu.innerHTML = `
            <a href="${dataset.oidcLogoutUrl}">
                Logout
            </a>
        `;
        navBar.parentNode.insertBefore(userMenu, navBar.nextSibling);
    }
});
