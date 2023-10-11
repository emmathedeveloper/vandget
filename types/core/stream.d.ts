import { VanFragment, VanStream, VanWidget } from "../interfaces";
declare class Stream<T> implements VanStream<T> {
    #private;
    constructor(initial_value: T);
    update(callback: (value: T) => T): void;
    set(value: T): void;
    subscribe(callback: (value: T) => void): () => boolean;
    removeFromWatchList(id: string): void;
    addToWatchList(widget: VanWidget | VanFragment): void;
    get isStream(): boolean;
    get isObservable(): boolean;
    get value(): T;
    set value(new_value: T);
}
export default function stream<T>(initial_value: T): Stream<T>;
export {};
//# sourceMappingURL=stream.d.ts.map