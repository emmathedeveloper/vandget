import { addEvents, compareObjects, processObject } from "../helper/helper"
import { DestroyOptions, MountOptions, PlugFragment, PlugWidget, PlugWidgetConfig, PreviousSiblingsOrChildrenCallback } from "../interfaces";
import { run_entry_transition, run_exit_transition } from "../transition/runner";


export default function Widget(config: PlugWidgetConfig) : PlugWidget{
    
    let element = document.createElement(config.tag)

    let parent: Element

    let DOMPosition: number

    let getSiblingsCallback: PreviousSiblingsOrChildrenCallback | undefined

    let isMounted = false

    const id = Math.floor(Math.random() * 1000000000).toString()

    const recent = {
        props: {},
        style: {},
        attributes: {}
    }

    function mount({node , DOMPosition: position , getSiblings , runEntryTransition } : MountOptions){
        
        parent = node

        DOMPosition = position!

        getSiblingsCallback = getSiblings

        if(getSiblings){
            
            const position = getMountedSiblings()
            
            const position_occupied = node.children[position]
            
            position_occupied ? node.insertBefore(element , position_occupied) : node.insertAdjacentElement('beforeend' , element)
        }else{
            
            const position = DOMPosition
            
            const position_occupied = node.children[position]
            
            position_occupied ? node.insertBefore(element , position_occupied) : node.insertAdjacentElement('beforeend' , element)
        }
        
        mountChildren()

        if(typeof config.transition === 'function' && (runEntryTransition === undefined || runEntryTransition === true)) {
            
            run_entry_transition(element , config.transition) 
        }

        isMounted = true

        update()
    }

    function mountChildren(){

        if(config.children) config.children.forEach((child , i) => {
            child.mount({ node: element , DOMPosition: i , getSiblings: getChildren, runEntryTransition: true })
        })
    }

    function getMountedSiblings(){

        if(!getSiblingsCallback) return 0

        const previous_siblings = getSiblingsCallback(0 , DOMPosition)
        
        const mountedSiblings: Element[] = []

        previous_siblings.forEach(sibling => sibling.collectMountedElements(mountedSiblings))
        
        return mountedSiblings.length
    }

    function update(){

        const processed_styles = processObject(config.style)

        const processed_props = processObject(config.props)

        const processed_attributes = processObject(config.attributes)

        const new_styles = compareObjects(recent.style , processed_styles)

        const new_props = compareObjects(recent.props , processed_props)

        const new_attributes = compareObjects(recent.attributes , processed_attributes)

        Object.assign(element.style , new_styles)

        Object.assign(element , new_props)

        for(const attribute in new_attributes){
            element.setAttribute(attribute , new_attributes[attribute])
        }
        
        recent.props = processed_props
        
        recent.style = processed_styles
        
        recent.attributes = processed_attributes

        if(config.children){
            config.children.forEach(child => {
                if(!child.isComponent){
                    child.update()
                }else if(child.isComponent && child.allowStatePassThrough){
                    child.update()
                }
            })
        }
    }
    
    async function destroy(options?: DestroyOptions){

        
        isMounted = false
        
        if(typeof config.transition === 'function' && (options?.runExitTransition === undefined || options?.runExitTransition === true)){
            
            run_exit_transition(element , config.transition).then(() => {
                element.remove()
                
                config.children?.forEach(child => child.destroy(options))
            })
            
            return
        } 

        element.remove()
    }
    
    function init(){
        const processed_styles = config.style ? processObject(config.style) : {}

        const processed_props = config.props ? processObject(config.props) : {}
        
        const processed_attributes = config.attributes ? processObject(config.attributes) : {}
        
        Object.assign(element.style , processed_styles)
        
        Object.assign(element , processed_props)
        
        for(const attribute in processed_attributes){
            element.setAttribute(attribute , processed_attributes[attribute])
        }
        
        addEvents(config.events , element)

        recent.props = processed_props

        recent.style = processed_styles

        recent.attributes = processed_attributes

        if(config.ref) config.ref.current = element

    }

    function getChildren(start?: number , end?: number){

        if(!config.children) return []
        
        let to_be_returned = [...config.children.slice(start , end)]
        
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

        if(stillContainsFragments) checkForFragments(config)
    }

    checkForFragments(config)

    init()

    return {
        get id(){ return id },

        get isComponent(){ return false },

        get isMounted(){ return isMounted },

        collectMountedElements: (collected: (Element)[]) => {

            if(isMounted) collected.push(element)
        } ,

        allowStatePassThrough: true,

        mount,

        update,

        destroy
    }
}

