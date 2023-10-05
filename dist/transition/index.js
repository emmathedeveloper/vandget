"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slidefade = exports.fade = void 0;
function fade(options) {
    let duration = options?.duration || 1000;
    let delay = options?.duration || 0;
    return (node) => {
        const style = getComputedStyle(node);
        return {
            delay,
            duration,
            from: {
                opacity: 0
            },
            to: {
                opacity: style.opacity
            },
            exit: {
                opacity: 0
            }
        };
    };
}
exports.fade = fade;
function slidefade(options = { delay: 0, duration: 1000, axis: 'x' }) {
    let { delay, duration, axis } = options;
    return (node) => {
        const style = getComputedStyle(node);
        return {
            delay,
            duration,
            from: {
                transform: `${axis === 'x' ? 'translateX(-30px)' : 'translateY(-30px)'}`,
                opacity: 0
            },
            to: {
                transform: style.transform,
                opacity: style.opacity
            },
            exit: {
                transform: `${axis === 'x' ? 'translateX(-30px)' : 'translateY(-30px)'}`,
                opacity: 0
            }
        };
    };
}
exports.slidefade = slidefade;
//# sourceMappingURL=index.js.map