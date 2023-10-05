"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checks_1 = require("../helper/checks");
const helper_1 = require("../helper/helper");
function $each({ values, widget }) {
    if (!(0, checks_1.isValidValueForEachFragment)(values))
        throw new Error('The values prop of the "$each" logical fragment has to be an Array or PlugStream with an Array as it\'s value');
    let DOMPosition;
    let parent;
    let isMounted = false;
    const state = {
        current_values: []
    };
    let getSiblingsCallback;
    const widget_map = new Map();
    const EachFragment = {
        isEachFragment: true,
        get isFragment() { return true; },
        allowStatePassThrough: true,
        get isMounted() { return isMounted; },
        collectMountedElements: (collected) => {
            widget_map.forEach(widget => widget.collectMountedElements(collected));
        },
        isComponent: false,
        id: Math.floor(Math.random() * 1000000000).toString(),
        mount,
        update,
        destroy
    };
    function mount({ node, DOMPosition: position, getSiblings }) {
        parent = node;
        DOMPosition = position;
        getSiblingsCallback = getSiblings;
        update(!Array.isArray(values) && values.isStream ? values.value : values);
    }
    function update(data) {
        if (data === undefined)
            return;
        const new_values = data;
        const change_point = Math.min(new_values.length, state.current_values.length);
        if (new_values.length !== state.current_values.length) {
            new_values.length > state.current_values.length ? addToExisting(state.current_values, new_values) : removeFromExisting(state.current_values, new_values);
        }
        updateExisting(state.current_values, new_values, change_point);
        state.current_values = [...new_values];
    }
    function addToExisting(old_values, new_values) {
        for (let i = old_values.length; i < new_values.length; i++) {
            state.current_values[i] = new_values[i];
            const built_widget = widget(new_values[i], i);
            widget_map.set(i, built_widget);
            built_widget.mount({ node: parent, DOMPosition: DOMPosition + i, getSiblings: getChildren, runEntryTransition: true });
        }
    }
    function removeFromExisting(old_values, new_values) {
        for (let i = new_values.length; i < old_values.length; i++) {
            state.current_values.splice(i, 1);
            const widget_to_destroy = widget_map.get(i);
            widget_map.delete(i);
            widget_to_destroy?.destroy({ runExitTransition: true });
        }
    }
    function updateExisting(old_values, new_values, change_point) {
        for (let i = 0; i < change_point; i++) {
            if (JSON.stringify(old_values[i]) === JSON.stringify(new_values[i]))
                continue;
            state.current_values[i] = new_values[i];
            const widget_to_destroy = widget_map.get(i);
            const widget_to_build = widget(new_values[i], i);
            widget_map.set(i, widget_to_build);
            widget_to_destroy?.destroy({ runExitTransition: false });
            widget_to_build.mount({ node: parent, DOMPosition: DOMPosition + i, getSiblings: getChildren, runEntryTransition: false });
        }
    }
    function destroy(options) {
        if (!Array.isArray(values) && values.isStream)
            values.removeFromWatchList(EachFragment.id);
        widget_map.forEach(widget => widget.destroy(options));
        widget_map.clear();
    }
    function getChildren(start, end) {
        const children = (0, helper_1.transformMapToArray)(widget_map).slice(start, end);
        let to_be_returned = getSiblingsCallback ? getSiblingsCallback(0, DOMPosition, true) : [];
        to_be_returned = [...to_be_returned, ...children.slice(start, end)];
        return to_be_returned;
    }
    function init() {
        if (!Array.isArray(values) && values.isStream)
            values.addToWatchList(EachFragment);
    }
    init();
    return EachFragment;
}
exports.default = $each;
//# sourceMappingURL=Each.js.map