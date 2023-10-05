"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const widgets_1 = require("../widgets");
const routehelpers_1 = require("./routehelpers");
function Link(linkConfig) {
    const config = {
        style: linkConfig.style,
    };
    if (linkConfig.className)
        config.className = linkConfig.className;
    return (0, widgets_1.Interactive)({
        ...config,
        onClick: () => {
            if (linkConfig.to.startsWith('http')) {
                window.open(linkConfig.to, "_blank");
            }
            else
                routehelpers_1.navigate.to(linkConfig.to, linkConfig.options);
        },
        child: linkConfig.child,
    });
}
exports.default = Link;
//# sourceMappingURL=Link.js.map