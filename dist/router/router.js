"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helper/helper");
function Router({ onRouteChange = () => { }, routes }) {
    let id = Math.floor(Math.random() * 1000000000).toString();
    let position;
    let parent;
    let getSiblingsCallback;
    let currentWidget;
    function init() {
        window.addEventListener('popstate', run_route);
        window.addEventListener('DOMContentLoaded', run_route);
        const win = window;
        win.router = {
            navigate: run_route,
            params: {}
        };
        run_route();
    }
    function run_route() {
        let match = routes.map(route => (0, helper_1.urlIsMatch)(location.pathname, route.path)).find(res => res.isMatch);
        currentWidget?.destroy();
        const win = window;
        win.router.params = match?.params;
        if (match) {
            const found = routes.find(route => route.path === match?.path);
            currentWidget = found?.widget();
            currentWidget?.mount({ node: parent, DOMPosition: position, getSiblings: getSiblingsCallback });
            onRouteChange(match);
        }
        else if (!match) {
            const found = routes.find(route => route.path === '*');
            currentWidget = found?.widget();
            currentWidget?.mount({ node: parent, DOMPosition: position, getSiblings: getSiblingsCallback });
        }
    }
    function mount({ node, DOMPosition, getSiblings }) {
        position = DOMPosition;
        parent = node;
        getSiblingsCallback = getSiblings;
        init();
    }
    function update() {
    }
    function destroy(options) {
        window.removeEventListener('popstate', run_route);
        window.removeEventListener('DOMContentLoaded', run_route);
        currentWidget?.destroy(options);
    }
    return {
        get id() { return id; },
        get isComponent() { return false; },
        get isMounted() { return true; },
        collectMountedElements: (collected) => {
            currentWidget?.collectMountedElements(collected);
        },
        mount,
        update,
        destroy
    };
}
exports.default = Router;
//# sourceMappingURL=router.js.map