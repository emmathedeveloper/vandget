import { reference } from "../helper/helper"
import { VanFragment, VanStream, VanWidget } from "../interfaces"




class Stream<T> implements VanStream<T>{

    #value: T

    #widget_list: (VanFragment & VanWidget)[]

    #subscribtions: Map<string , (value: T) => void>

    constructor(initial_value: T){

        this.#value = initial_value

        this.#widget_list = []

        this.#subscribtions = new Map()
    }

    update(callback: (value: T) => T){
        
        const new_value = callback(reference(this.#value))

        if(JSON.stringify(this.#value) === JSON.stringify(new_value)) return

        this.#value = reference(new_value)

        this.#updateWidgetList()

        this.#runSubscribtions()
    }

    set(value: T){

        this.#value = reference(value)

        this.#updateWidgetList()

        this.#runSubscribtions()
    }

    subscribe(callback: (value: T) => void){

        const key = Math.floor(Math.random() * 1000000000).toString()

        this.#subscribtions.set(key , callback)

        return () => this.#subscribtions.delete(key)
    }

    removeFromWatchList(id: string){
        this.#widget_list = this.#widget_list.filter(widget => widget.id !== id)
    }

    addToWatchList(widget: VanWidget | VanFragment){

        this.#widget_list.push(widget)

        widget.update()
    }

    #updateWidgetList(){

        this.#widget_list.forEach(component => component.update(component.isFragment ? reference(this.#value) : undefined))
    }

    #runSubscribtions(){

        this.#subscribtions.forEach(subscribtion => subscribtion(reference(this.#value)))
    }

    get isStream() { return true }

    get isObservable() { return true }

    get value() { return reference(this.#value) }

    set value(new_value: T){

        this.#value = reference(new_value)

        this.#updateWidgetList()

        this.#runSubscribtions()
    }

}





export default function stream<T>(initial_value: T){

    return new Stream(initial_value)
}