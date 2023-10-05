"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Avoid using this logical fragment by all means as it is still under development
 *
 * @param {() => PlugWidget | undefined} widget
 * @returns {PlugFragment}
 */
function $if({ condition, widget }) {
    let current_widget;
    let parent;
    let DOMPosition;
    let isMounted = false;
    let getSiblingsCallback;
    let default_widget;
    const memory = new Map();
    const id = Math.floor(Math.random() * 1000000000).toString();
    const fragment = {
        get id() { return id; },
        get isComponent() { return false; },
        get isMounted() { return isMounted; },
        collectMountedElements: (collected) => {
            if (current_widget)
                current_widget.collectMountedElements(collected);
        },
        isFragment: true,
        allowStatePassThrough: true,
        mount,
        update,
        destroy,
    };
    function mount({ node, DOMPosition: position, getSiblings }) {
        parent = node;
        DOMPosition = position;
        getSiblingsCallback = getSiblings;
        update();
    }
    function update() {
        let new_widget;
        for (let i = 0; i < memory.size; i++) {
            const gotten = memory.get(i);
            const res = typeof gotten?.condition === 'function' ? gotten.condition() : gotten?.condition;
            if (res && gotten?.widget) {
                new_widget = gotten.widget;
                break;
            }
        }
        if (!new_widget) {
            if (default_widget && default_widget?.id === current_widget?.id) {
                return;
            }
            else {
                current_widget?.destroy();
                current_widget = default_widget;
                current_widget?.mount({ node: parent, DOMPosition, getSiblings: getSiblingsCallback, runEntryTransition: true });
            }
        }
        else {
            if (current_widget?.id === new_widget?.id)
                return;
            current_widget?.destroy();
            current_widget = new_widget;
            current_widget.mount({ node: parent, DOMPosition, getSiblings: getSiblingsCallback, runEntryTransition: true });
        }
    }
    function destroy(options) {
        current_widget?.destroy(options);
        isMounted = false;
    }
    function init({ condition, widget }) {
        memory.set(memory.size, { condition, widget });
    }
    function $elseif({ condition, widget }) {
        memory.set(memory.size, { condition, widget });
        return {
            ...fragment,
            $elseif,
            $else
        };
    }
    function $else(widget) {
        default_widget = widget;
        return fragment;
    }
    init({ condition, widget });
    return {
        ...fragment,
        $elseif,
        $else
    };
}
exports.default = $if;
//# sourceMappingURL=If.js.map