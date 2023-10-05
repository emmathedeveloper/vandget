import { PlugWidget, AwaitLogicFragmentParams, PlugFragment } from "../interfaces";
/**
 * @description A LogicalFragment for rendering promise based widgets.
 *
 * @param {AwaitLogicFragmentParams} param0
 * @returns {PlugFragment}
 */
export default function $await<T>({ promise, pending, fullfilled, rejected }: AwaitLogicFragmentParams<T>): PlugWidget | PlugFragment;
//# sourceMappingURL=Await.d.ts.map