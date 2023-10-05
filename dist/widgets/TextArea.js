"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function TextArea(config) {
    const init = {
        tag: 'textarea',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: {},
        attributes: {},
        events: {}
    };
    if (config?.className)
        init.props.className = config?.className;
    if (config?.id)
        init.props.id = config?.id;
    if (config?.rows)
        init.props.rows = config?.rows;
    if (config?.cols)
        init.props.cols = config?.cols;
    if (config?.value)
        init.props.value = config?.value;
    if (config?.placeholder)
        init.props.placeholder = config?.placeholder;
    if (config?.type)
        init.props.type = config?.type;
    if (config?.autoFocus)
        init.props.autoFocus = config?.autoFocus;
    if (typeof config?.onInput === 'function')
        init.events.onInput = config?.onInput;
    if (typeof config?.onBlur === 'function')
        init.events.onBlur = config?.onBlur;
    if (typeof config?.onChange === 'function')
        init.events.onChange = config?.onChange;
    return (0, core_1.Widget)(init);
}
exports.default = TextArea;
//# sourceMappingURL=TextArea.js.map