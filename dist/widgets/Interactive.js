"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function Interactive(config) {
    const init = {
        tag: config?.type || 'div',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: {},
        attributes: {},
        events: {},
        children: [config?.child]
    };
    if (config?.className)
        init.props.className = config.className;
    if (config?.id)
        init.props.id = config.id;
    for (const event in config) {
        if (event.startsWith('on') && typeof config[event] === 'function')
            init.events[event] = config[event];
    }
    return (0, core_1.Widget)(init);
}
exports.default = Interactive;
//# sourceMappingURL=Interactive.js.map