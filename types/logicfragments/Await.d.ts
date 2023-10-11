import { VanWidget, AwaitLogicFragmentParams, VanFragment } from "../interfaces";
/**
 * @description A LogicalFragment for rendering promise based widgets.
 *
 * @param {AwaitLogicFragmentParams} param0
 * @returns {VanFragment}
 */
export default function $await<T>({ promise, pending, fullfilled, rejected }: AwaitLogicFragmentParams<T>): VanWidget | VanFragment;
//# sourceMappingURL=Await.d.ts.map