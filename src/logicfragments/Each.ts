import { isValidValueForEachFragment } from "../helper/checks";
import { transformMapToArray } from "../helper/helper";
import { DestroyOptions, EachLogicFragmentParams, MountOptions, VanFragment, VanWidget, PreviousSiblingsOrChildrenCallback } from "../interfaces";



export default function $each<T>({ values , widget } : EachLogicFragmentParams<T>) : VanFragment{
    
    if(!isValidValueForEachFragment(values)) throw new Error('The values prop of the "$each" logical fragment has to be an Array or VanStream with an Array as it\'s value')

    let DOMPosition: number | undefined

    let parent: Element

    let isMounted = false

    const state: { current_values: T[] } = {
        current_values: []
    }

    let getSiblingsCallback: PreviousSiblingsOrChildrenCallback | undefined
    
    const widget_map: Map<number , (VanWidget | VanFragment)> = new Map()

    const EachFragment = {
        isEachFragment: true,
        
        get isFragment() { return true } ,
        
        allowStatePassThrough: true,
        
        get isMounted() { return isMounted },
        
        collectMountedElements: (collected: Element[]) => {
            
            widget_map.forEach(widget => widget.collectMountedElements(collected))
        },
        
        isComponent: false,
        
        id: Math.floor(Math.random() * 1000000000).toString(),
        
        mount,
        
        update,
        
        destroy
    }
    
    function mount({node , DOMPosition: position , getSiblings } : MountOptions){

        parent = node

        DOMPosition = position

        getSiblingsCallback = getSiblings

        update(!Array.isArray(values) && values.isStream ? values.value : values)
    }
    
    function update(data?: any){

        if(data === undefined) return

        const new_values = data as T[]

        const change_point = Math.min(new_values.length , state.current_values.length)
        
        if(new_values.length !== state.current_values.length){
            new_values.length > state.current_values.length ? addToExisting(state.current_values , new_values) : removeFromExisting(state.current_values , new_values)
        }

        updateExisting(state.current_values , new_values , change_point)

        state.current_values = [...new_values]
    }

    function addToExisting(old_values: T[] , new_values: T[]){
        
        for(let i = old_values.length; i < new_values.length; i++){

            state.current_values[i] = new_values[i]

            const built_widget = widget(new_values[i]! , i)
            
            widget_map.set(i , built_widget)

            built_widget.mount({ node: parent , DOMPosition: DOMPosition! + i , getSiblings: getChildren , runEntryTransition: true })
        }
    }
    
    function removeFromExisting(old_values: T[] , new_values: T[]){
        
        for(let i = new_values.length; i < old_values.length; i++){

            state.current_values.splice(i , 1)
    
            const widget_to_destroy = widget_map.get(i)
            
            widget_map.delete(i)
    
            widget_to_destroy?.destroy({ runExitTransition: true })
        }
    }
    
    function updateExisting(old_values: T[], new_values: T[] , change_point: number){
                
        
        for(let i = 0; i < change_point; i++){
            
            if(JSON.stringify(old_values[i]) === JSON.stringify(new_values[i])) continue

            state.current_values[i] = new_values[i]

            const widget_to_destroy = widget_map.get(i)

            const widget_to_build = widget(new_values[i]! , i)

            widget_map.set(i , widget_to_build)
    
            widget_to_destroy?.destroy({ runExitTransition: false })

            widget_to_build.mount({ node: parent , DOMPosition: DOMPosition! + i , getSiblings: getChildren , runEntryTransition: false })
        }
    }

    function destroy(options?: DestroyOptions){

        if(!Array.isArray(values) && values.isStream) values.removeFromWatchList(EachFragment.id)

        widget_map.forEach(widget => widget.destroy(options))

        widget_map.clear()
    }

    function getChildren(start?: number , end?: number) : (VanWidget & VanFragment)[]{

        const children = transformMapToArray(widget_map).slice(start , end)
        
        let to_be_returned = getSiblingsCallback ? getSiblingsCallback(0 , DOMPosition , true) : []
        
        to_be_returned = [...to_be_returned, ...children.slice(start , end)]
        
        return to_be_returned
    }
    
    function init(){

        if(!Array.isArray(values) && values.isStream) values.addToWatchList(EachFragment)
    }

    init()

    return EachFragment
}


