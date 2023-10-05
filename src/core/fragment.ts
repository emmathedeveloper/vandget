import { DestroyOptions, MountOptions, PlugFragment, PlugWidget, PreviousSiblingsOrChildrenCallback } from "../interfaces";


/**
 * 
 * @description This widget is still experimental. DO NOT nest any kind of logicalfragment , like the "$each" , "$if" or "$await", directly within this widget to prevent wrong layout in the DOM.
 * 
 * @param {(PlugFragment | PlugWidget)[]} children - list of child widgets to render.
 * @returns {PlugFragment}
 */
export default function Fragment(children: (PlugWidget & PlugFragment)[]) : PlugFragment{

    const id = Math.floor(Math.random() * 1000000000).toString()

    let parent: Element

    let DOMPosition: number | undefined

    let isMounted = false

    let config = { children }

    let getSiblingsCallback: PreviousSiblingsOrChildrenCallback | undefined

    function mount({ node , DOMPosition: position , getSiblings , runEntryTransition } : MountOptions){

        DOMPosition = position;
        
        getSiblingsCallback = getSiblings

        config.children.forEach((child , i) => child.mount({node , DOMPosition: DOMPosition! + i , getSiblings , runEntryTransition }))

        parent = node

        isMounted = true
    }
    
    function update(){
        
        config.children.forEach(child => child.update())
    }
    
    function destroy(options?: DestroyOptions){
        
        config.children.forEach(child => child.destroy(options))

        isMounted = false
    }

    function getChildren(start?: number , end?: number) : (PlugWidget & PlugFragment)[]{

        let to_be_returned = getSiblingsCallback ? getSiblingsCallback(0 , DOMPosition , true) : []

        to_be_returned = [...to_be_returned, ...config.children.slice(start , end)]
        
        return to_be_returned
    }

    
    function checkForFragments(config: any){

        interface fragment_list{
            at: number

            fragment: PlugFragment
        }

        let fragment_list: fragment_list[] = []

        if(config.children){
            
            config.children.forEach((child , i) => {
                
                if(child.isNormalFragment) fragment_list.push({ fragment: child , at: i })
            })
        }

        fragment_list.forEach(block => {
            if(block.fragment.children) config.children?.splice(block.at , 1 , block.fragment.children())
        })

        config.children = config.children?.flat()

        const stillContainsFragments = config.children?.some(child => child.isNormalFragment)

        if(stillContainsFragments) checkForFragments(config.children)
    }

    checkForFragments(config)


    return {
        get id(){ return id },

        get isComponent() { return false },

        get isMounted() { return isMounted },

        collectMountedElements: (collected: Element[]) => {

            config.children.forEach(child => child.collectMountedElements(collected))
        },

        children: getChildren,

        allowStatePassThrough: true,

        isFragment: true,

        isNormalFragment: true,
        
        mount,

        update,

        destroy
    }
}