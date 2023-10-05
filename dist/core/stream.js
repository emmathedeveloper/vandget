"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Stream_instances, _Stream_value, _Stream_widget_list, _Stream_subscribtions, _Stream_updateWidgetList, _Stream_runSubscribtions;
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helper/helper");
class Stream {
    constructor(initial_value) {
        _Stream_instances.add(this);
        _Stream_value.set(this, void 0);
        _Stream_widget_list.set(this, void 0);
        _Stream_subscribtions.set(this, void 0);
        __classPrivateFieldSet(this, _Stream_value, initial_value, "f");
        __classPrivateFieldSet(this, _Stream_widget_list, [], "f");
        __classPrivateFieldSet(this, _Stream_subscribtions, new Map(), "f");
    }
    update(callback) {
        const new_value = callback((0, helper_1.reference)(__classPrivateFieldGet(this, _Stream_value, "f")));
        if (JSON.stringify(__classPrivateFieldGet(this, _Stream_value, "f")) === JSON.stringify(new_value))
            return;
        __classPrivateFieldSet(this, _Stream_value, (0, helper_1.reference)(new_value), "f");
        __classPrivateFieldGet(this, _Stream_instances, "m", _Stream_updateWidgetList).call(this);
        __classPrivateFieldGet(this, _Stream_instances, "m", _Stream_runSubscribtions).call(this);
    }
    set(value) {
        __classPrivateFieldSet(this, _Stream_value, (0, helper_1.reference)(value), "f");
        __classPrivateFieldGet(this, _Stream_instances, "m", _Stream_updateWidgetList).call(this);
        __classPrivateFieldGet(this, _Stream_instances, "m", _Stream_runSubscribtions).call(this);
    }
    subscribe(callback) {
        const key = Math.floor(Math.random() * 1000000000).toString();
        __classPrivateFieldGet(this, _Stream_subscribtions, "f").set(key, callback);
        return () => __classPrivateFieldGet(this, _Stream_subscribtions, "f").delete(key);
    }
    removeFromWatchList(id) {
        __classPrivateFieldSet(this, _Stream_widget_list, __classPrivateFieldGet(this, _Stream_widget_list, "f").filter(widget => widget.id !== id), "f");
    }
    addToWatchList(widget) {
        __classPrivateFieldGet(this, _Stream_widget_list, "f").push(widget);
        widget.update();
    }
    get isStream() { return true; }
    get isObservable() { return true; }
    get value() { return (0, helper_1.reference)(__classPrivateFieldGet(this, _Stream_value, "f")); }
    set value(new_value) {
        __classPrivateFieldSet(this, _Stream_value, (0, helper_1.reference)(new_value), "f");
        __classPrivateFieldGet(this, _Stream_instances, "m", _Stream_updateWidgetList).call(this);
        __classPrivateFieldGet(this, _Stream_instances, "m", _Stream_runSubscribtions).call(this);
    }
}
_Stream_value = new WeakMap(), _Stream_widget_list = new WeakMap(), _Stream_subscribtions = new WeakMap(), _Stream_instances = new WeakSet(), _Stream_updateWidgetList = function _Stream_updateWidgetList() {
    __classPrivateFieldGet(this, _Stream_widget_list, "f").forEach(component => component.update(component.isFragment ? (0, helper_1.reference)(__classPrivateFieldGet(this, _Stream_value, "f")) : undefined));
}, _Stream_runSubscribtions = function _Stream_runSubscribtions() {
    __classPrivateFieldGet(this, _Stream_subscribtions, "f").forEach(subscribtion => subscribtion((0, helper_1.reference)(__classPrivateFieldGet(this, _Stream_value, "f"))));
};
function stream(initial_value) {
    return new Stream(initial_value);
}
exports.default = stream;
//# sourceMappingURL=stream.js.map