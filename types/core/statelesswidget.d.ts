import { PlugStatelessWidget, PlugWidget } from "../interfaces";
/**
 * @description Same as other regular widgets, but is able to run lifecycle callbacks. This Widget is also dependent on it's parent widget and cannot listen to streams.
 *
 * @returns {PlugWidget}
 */
export default function StatelessWidget({ onBeforeMount, onMount, onDestroy, body, allowParentalUpdate }: PlugStatelessWidget): PlugWidget;
//# sourceMappingURL=statelesswidget.d.ts.map