import { PlugWidget, IfLogicFragmentParams , IfLogicFragment, PlugFragment, PreviousSiblingsOrChildrenCallback, MountOptions, DestroyOptions } from "../interfaces";




/**
 * @description Avoid using this logical fragment by all means as it is still under development
 * 
 * @param {() => PlugWidget | undefined} widget
 * @returns {PlugFragment}
 */
export default function $if({ condition , widget } : IfLogicFragmentParams) : IfLogicFragment{

    let current_widget: (PlugWidget & PlugFragment) | undefined

    let parent: Element

    let DOMPosition: number | undefined

    let isMounted = false

    let getSiblingsCallback: PreviousSiblingsOrChildrenCallback | undefined

    let default_widget: PlugWidget | PlugFragment | undefined

    const memory: Map<number , IfLogicFragmentParams> = new Map()

    const id = Math.floor(Math.random() * 1000000000).toString()

    const fragment = {
        get id(){ return id },

        get isComponent(){ return false },

        get isMounted() { return isMounted },

        collectMountedElements: (collected: Element[]) => {

            if(current_widget) current_widget.collectMountedElements(collected)
        },

        isFragment: true,

        allowStatePassThrough: true,

        mount,

        update,

        destroy,

    }

    function mount({ node , DOMPosition: position , getSiblings } : MountOptions){

        parent = node

        DOMPosition = position

        getSiblingsCallback = getSiblings 
        
        update()
    }

    function update(){

        let new_widget: PlugWidget | PlugFragment | undefined

        for(let i = 0; i < memory.size; i++){

            const gotten = memory.get(i)

            const res = typeof gotten?.condition === 'function' ? gotten.condition() : gotten?.condition

            if(res && gotten?.widget){

                new_widget = gotten.widget

                break
            }
        }

        if(!new_widget){
            
            if(default_widget && default_widget?.id === current_widget?.id){
                return
            }else{
                current_widget?.destroy()
                
                current_widget = default_widget
                
                current_widget?.mount({ node: parent , DOMPosition , getSiblings: getSiblingsCallback , runEntryTransition: true })
            }

        }else{

            if(current_widget?.id === new_widget?.id) return
    
            current_widget?.destroy()

            current_widget = new_widget

            current_widget.mount({ node: parent , DOMPosition , getSiblings: getSiblingsCallback , runEntryTransition: true })
        }

    }

    function destroy(options?: DestroyOptions){

        current_widget?.destroy(options)

        isMounted = false
    }

    function init({ condition , widget } : IfLogicFragmentParams){

        memory.set(memory.size , { condition , widget })
    }

    function $elseif({ condition , widget } : IfLogicFragmentParams){

        memory.set(memory.size , { condition , widget })
        
        return {
            ...fragment,
            $elseif,
            $else
        }
    }
    
    function $else(widget: PlugWidget | PlugFragment){

        default_widget = widget

        return fragment
    }

    init({ condition , widget })

    return {
        ...fragment,
        $elseif,
        $else
    }
}


