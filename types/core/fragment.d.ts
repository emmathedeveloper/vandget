import { PlugFragment, PlugWidget } from "../interfaces";
/**
 *
 * @description This widget is still experimental. DO NOT nest any kind of logicalfragment , like the "$each" , "$if" or "$await", directly within this widget to prevent wrong layout in the DOM.
 *
 * @param {(PlugFragment | PlugWidget)[]} children - list of child widgets to render.
 * @returns {PlugFragment}
 */
export default function Fragment(children: (PlugWidget & PlugFragment)[]): PlugFragment;
//# sourceMappingURL=fragment.d.ts.map