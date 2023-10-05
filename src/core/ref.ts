import { PlugRef } from "../interfaces"



/**
 * 
 * @template T
 * 
 * @param {T} initial_value The initial value for the ref.
 * @returns {PlugRef<T>}
 */
export default function ref<T>(initial_value?: T) : PlugRef<T>{

    let current = initial_value

    return {

        clear(){

            current = undefined
        },

        set current(value: T){

            current = value
        },

        get current() : T | undefined{

            return current
        }
    }
}