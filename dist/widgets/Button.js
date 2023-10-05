"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function Button(text, config) {
    const init = {
        tag: 'button',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: { textContent: text },
        attributes: {},
        events: { onClick: config?.onClick }
    };
    if (config?.className)
        init.props.className = config.className;
    if (config?.id)
        init.props.id = config.id;
    return (0, core_1.Widget)(init);
}
exports.default = Button;
//# sourceMappingURL=Button.js.map