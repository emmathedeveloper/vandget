"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function Text(text, config) {
    const init = {
        tag: config?.type || 'p',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: { textContent: text },
        attributes: {}
    };
    if (config?.className)
        init.props.className = config.className;
    if (config?.id)
        init.props.id = config.id;
    return (0, core_1.Widget)(init);
}
exports.default = Text;
//# sourceMappingURL=Text.js.map