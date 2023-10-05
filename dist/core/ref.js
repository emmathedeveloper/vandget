"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @template T
 *
 * @param {T} initial_value The initial value for the ref.
 * @returns {PlugRef<T>}
 */
function ref(initial_value) {
    let current = initial_value;
    return {
        clear() {
            current = undefined;
        },
        set current(value) {
            current = value;
        },
        get current() {
            return current;
        }
    };
}
exports.default = ref;
//# sourceMappingURL=ref.js.map