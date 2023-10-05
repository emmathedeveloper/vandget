"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checks_1 = require("../helper/checks");
/**
 *
 * @description A Widget that can listen to streams and update it's UI accordingly when those streams change
 *
 * @returns {PlugWidget}
 */
function StatefulWidget({ onBeforeMount, onMount, onDestroy, listen, body }) {
    const streams = listen;
    const widget = {
        get id() {
            return body.id;
        },
        get isComponent() {
            return true;
        },
        get isMounted() {
            return body.isMounted;
        },
        collectMountedElements: (collected) => {
            body.collectMountedElements(collected);
        },
        mount,
        update,
        destroy
    };
    function mount({ node, DOMPosition, getSiblings, runEntryTransition }) {
        if (!node)
            throw new Error('cannot mount widget on undefined node');
        if (!body)
            throw new Error('property "body" of Plugcomponent must be of type PlugWidget or PlugComponent');
        if (typeof onBeforeMount === 'function')
            onBeforeMount();
        body.mount({ node, DOMPosition, getSiblings, runEntryTransition });
        if (Array.isArray(streams) && (0, checks_1.streamsToListenToAreValid)(streams))
            streams.forEach(observable => observable.addToWatchList(widget));
        if (typeof onMount === 'function')
            onMount();
    }
    function update() {
        if (!body.isComponent) {
            body.update();
        }
        else if (body.isComponent && body.allowStatePassThrough) {
            body.update();
        }
    }
    function destroy(options) {
        body.destroy(options);
        if (typeof onDestroy === 'function')
            onDestroy();
        if (Array.isArray(streams) && (0, checks_1.streamsToListenToAreValid)(streams))
            streams.forEach(observable => observable.removeFromWatchList(widget.id));
    }
    return widget;
}
exports.default = StatefulWidget;
//# sourceMappingURL=statefulwidget.js.map