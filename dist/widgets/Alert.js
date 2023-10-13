"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
//text: Updater<string>,
// so it can take a child of button and also has the events of click and cancel and I will also add the OnPop event
function Alert(config, children) {
    const init = {
        tag: 'alert',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: {},
        attributes: {},
        events: {}
    };
    if (config?.className)
        init.props.className = config.className;
    if (config?.id)
        init.props.id = config.id;
    if (typeof config?.onClick === 'function')
        init.events.onClick = config?.onClick;
    if (typeof config?.onCancel === 'function')
        init.events.onCancel = config?.onCancel;
    if (children)
        init.props.children = children;
    return (0, core_1.Widget)(init);
}
exports.default = Alert;
//# sourceMappingURL=Alert.js.map