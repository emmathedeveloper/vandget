"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function Container(config) {
    const init = {
        tag: config?.type || 'div',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: {},
        attributes: {},
        children: config?.children
    };
    if (config?.className)
        init.props.className = config.className;
    if (config?.id)
        init.props.id = config.id;
    return (0, core_1.Widget)(init);
}
exports.default = Container;
//# sourceMappingURL=Container.js.map