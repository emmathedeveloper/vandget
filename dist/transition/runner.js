"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run_exit_transition = exports.run_entry_transition = void 0;
function run_entry_transition(node, factory) {
    return new Promise(res => {
        const { from, to, delay = 0, duration = 1000 } = factory(node);
        node.animate([from, to], {
            fill: 'backwards',
            easing: 'ease-out',
            delay,
            duration
        }).onfinish = res;
    });
}
exports.run_entry_transition = run_entry_transition;
function run_exit_transition(node, factory) {
    return new Promise(res => {
        const { to, exit = {}, delay = 0, duration = 1000 } = factory(node);
        node.animate([to, exit], {
            fill: 'backwards',
            easing: 'ease-out',
            delay,
            duration
        }).onfinish = res;
    });
}
exports.run_exit_transition = run_exit_transition;
//# sourceMappingURL=runner.js.map