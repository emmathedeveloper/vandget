import { VanStatelessWidget, VanWidget } from "../interfaces";
/**
 * @description Same as other Vanwidgets, but is able to run lifecycle callbacks. This Widget is also dependent on it's parent widget and cannot listen to streams.
 *
 * @returns {VanWidget}
 */
export default function StatelessWidget({ onBeforeMount, onMount, onDestroy, body, allowParentalUpdate }: VanStatelessWidget): VanWidget;
//# sourceMappingURL=statelesswidget.d.ts.map