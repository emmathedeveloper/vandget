import { VanFragment, VanWidget } from "../interfaces";
/**
 *
 * @description This widget is still experimental. DO NOT nest any kind of logicalfragment , like the "$each" , "$if" or "$await", directly within this widget to prevent wrong layout in the DOM.
 *
 * @param {(VanFragment | VanWidget)[]} children - list of child widgets to render.
 * @returns {VanFragment}
 */
export default function Fragment(children: (VanWidget & VanFragment)[]): VanFragment;
//# sourceMappingURL=fragment.d.ts.map