export declare function processObject(object: any): any;
export declare function compareObjects(old_object: any, new_object: any): any;
export declare function addEvents(events: any, element: Element): void;
export declare function transformToMap<T>(array: T[]): Map<number, T>;
export declare function transformMapToArray<T>(map: Map<number, T>): T[];
export declare function reference<T>(value: T): T;
export declare function getParams(to: string, path: string): any;
export declare function urlIsMatch(to: string, path: string): {
    isMatch: boolean;
    to: string;
    path: string;
    params: any;
};
//# sourceMappingURL=helper.d.ts.map