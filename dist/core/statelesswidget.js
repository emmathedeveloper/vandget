"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Same as other Vanwidgets, but is able to run lifecycle callbacks. This Widget is also dependent on it's parent widget and cannot listen to streams.
 *
 * @returns {VanWidget}
 */
function StatelessWidget({ onBeforeMount, onMount, onDestroy, body, allowParentalUpdate }) {
    function mount({ node, DOMPosition, getSiblings, runEntryTransition }) {
        if (!node)
            throw new Error('cannot mount widget on undefined node');
        if (!body)
            throw new Error('property "body" of Vancomponent must be of type VanWidget or VanComponent');
        if (typeof onBeforeMount === 'function')
            onBeforeMount();
        body.mount({ node, DOMPosition, getSiblings, runEntryTransition });
        if (typeof onMount === 'function')
            onMount();
    }
    function update() {
        body.update();
    }
    function destroy(options) {
        body.destroy(options);
        if (typeof onDestroy === 'function')
            onDestroy();
    }
    return {
        get id() {
            return body.id;
        },
        get isComponent() {
            return true;
        },
        get isMounted() {
            return body.isMounted;
        },
        allowStatePassThrough: allowParentalUpdate,
        collectMountedElements: (collected) => {
            body.collectMountedElements(collected);
        },
        mount,
        update,
        destroy
    };
}
exports.default = StatelessWidget;
//# sourceMappingURL=statelesswidget.js.map