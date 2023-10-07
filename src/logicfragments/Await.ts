


import { VanWidget, AwaitLogicFragmentParams, MountOptions, DestroyOptions, VanFragment } from "../interfaces";




/**
 * @description A LogicalFragment for rendering promise based widgets.
 * 
 * @param {AwaitLogicFragmentParams} param0
 * @returns {VanFragment}
 */
export default function $await<T>({ promise , pending , fullfilled , rejected } : AwaitLogicFragmentParams<T>) : VanWidget | VanFragment{

    let current_widget = pending

    let parent: Element

    let isMounted = false

    let DOMPosition: number | undefined

    const id = Math.floor(Math.random() * 1000000000).toString()

    function mount({node , DOMPosition: position , getSiblings , runEntryTransition } : MountOptions){

        parent = node

        DOMPosition = position
        
        current_widget?.mount({ node , DOMPosition , getSiblings , runEntryTransition })

        promise.then(res => {

            current_widget?.destroy()

            const fullfilled_widget = fullfilled!(res)

            current_widget = fullfilled_widget

            current_widget?.mount({ node , DOMPosition , getSiblings , runEntryTransition })
        }).catch(err => {
            
            current_widget?.destroy()
            
            const rejected_widget = rejected!(err)

            current_widget = rejected_widget

            current_widget?.mount({ node , DOMPosition , getSiblings , runEntryTransition })
        })
    }

    function update(){

        current_widget?.update()
    }

    function destroy(options?: DestroyOptions){

        current_widget?.destroy(options)
    }

    return {
        get id(){ return id },
        get isComponent(){ return false },
        get isMounted() { return isMounted },
        collectMountedElements: (collected: Element[]) => {
            
            current_widget?.collectMountedElements(collected)
        },
        allowStatePassThrough: true,
        mount,
        update,
        destroy,
    }
}
