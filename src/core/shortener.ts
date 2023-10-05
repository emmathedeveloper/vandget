import { reference } from "../helper/helper";
import { PlugStream } from "../interfaces";


export default function $<T>(stream: PlugStream<T>) : T {

    return reference(stream.value)
}