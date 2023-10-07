"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description A LogicalFragment for rendering promise based widgets.
 *
 * @param {AwaitLogicFragmentParams} param0
 * @returns {VanFragment}
 */
function $await({ promise, pending, fullfilled, rejected }) {
    let current_widget = pending;
    let parent;
    let isMounted = false;
    let DOMPosition;
    const id = Math.floor(Math.random() * 1000000000).toString();
    function mount({ node, DOMPosition: position, getSiblings, runEntryTransition }) {
        parent = node;
        DOMPosition = position;
        current_widget?.mount({ node, DOMPosition, getSiblings, runEntryTransition });
        promise.then(res => {
            current_widget?.destroy();
            const fullfilled_widget = fullfilled(res);
            current_widget = fullfilled_widget;
            current_widget?.mount({ node, DOMPosition, getSiblings, runEntryTransition });
        }).catch(err => {
            current_widget?.destroy();
            const rejected_widget = rejected(err);
            current_widget = rejected_widget;
            current_widget?.mount({ node, DOMPosition, getSiblings, runEntryTransition });
        });
    }
    function update() {
        current_widget?.update();
    }
    function destroy(options) {
        current_widget?.destroy(options);
    }
    return {
        get id() { return id; },
        get isComponent() { return false; },
        get isMounted() { return isMounted; },
        collectMountedElements: (collected) => {
            current_widget?.collectMountedElements(collected);
        },
        allowStatePassThrough: true,
        mount,
        update,
        destroy,
    };
}
exports.default = $await;
//# sourceMappingURL=Await.js.map