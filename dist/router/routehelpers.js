"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigate = exports.getUrlParams = void 0;
function getUrlParams() {
    const win = window;
    return win.router.params;
}
exports.getUrlParams = getUrlParams;
const win = window;
exports.navigate = {
    to: (to, options) => {
        if (to === location.pathname)
            return;
        if (!win.router)
            return;
        if (options && options.replace === true) {
            history.replaceState({}, '', to);
        }
        else
            history.pushState({}, '', to);
        win.router.navigate();
    },
    back() { history.back(); },
    forward() { history.forward(); },
};
//# sourceMappingURL=routehelpers.js.map