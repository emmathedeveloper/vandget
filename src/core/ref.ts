import { VanRef } from "../interfaces"



/**
 * 
 * @template T
 * 
 * @param {T} initial_value The initial value for the ref.
 * @returns {VanRef<T>}
 */
export default function ref<T>(initial_value?: T) : VanRef<T>{

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