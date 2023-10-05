import { TransitionFunction } from "../interfaces";
interface TransitionOptions {
    duration?: number;
    delay?: number;
}
export declare function fade(options?: TransitionOptions): TransitionFunction;
interface SlideFadeOptions extends TransitionOptions {
    axis?: 'x' | 'y';
}
export declare function slidefade(options?: SlideFadeOptions): TransitionFunction;
export {};
//# sourceMappingURL=index.d.ts.map