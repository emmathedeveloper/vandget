"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function Anchor(config) {
    const init = {
        tag: 'a',
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
    if (config?.href)
        init.props.href = config.href;
    if (config?.target)
        init.props.target = config.target;
    return (0, core_1.Widget)(init);
}
exports.default = Anchor;
//# sourceMappingURL=Anchor.js.map