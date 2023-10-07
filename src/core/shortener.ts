import { reference } from "../helper/helper";
import { VanStream } from "../interfaces";


export default function $<T>(stream: VanStream<T>) : T {

    return reference(stream.value)
}