"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function Image(config) {
    const init = {
        tag: 'img',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: {},
        attributes: {}
    };
    if (config?.className)
        init.props.className = config?.className;
    if (config?.id)
        init.props.id = config?.id;
    if (config?.src)
        init.props.src = config?.src;
    if (config?.height)
        init.attributes.height = config?.height;
    if (config?.width)
        init.attributes.width = config?.width;
    return (0, core_1.Widget)(init);
}
exports.default = Image;
//# sourceMappingURL=Image.js.map