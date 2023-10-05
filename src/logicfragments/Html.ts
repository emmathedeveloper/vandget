import { isValidValueForHtmlFragment } from "../helper/checks"
import { HtmlLogicFragmentParam, MountOptions, PlugFragment, PreviousSiblingsOrChildrenCallback } from "../interfaces"





export default function $html(content: HtmlLogicFragmentParam) : PlugFragment{

    if(!isValidValueForHtmlFragment(content)) throw new Error('The content parameter of the "$html" logical fragment has to be a string or PlugStream with a string as it\'s value')

    let id = Math.floor(Math.random() * 1000000000).toString()

    let element_list: Element[] = []

    let position: number | undefined

    let parent: Element

    let getSiblingsCallback: PreviousSiblingsOrChildrenCallback | undefined

    const virtual = document.createElement('div')

    const HtmlFragment = {
        get isComponent(){ return false },

        get isFragment() { return true },

        get id(){ return id },

        get isMounted(){ return true },

        collectMountedElements: (collected: Element[]) => {

            element_list.forEach(el => collected.push(el))
        },

        mount,
        update,
        destroy
    }

    init()

    function mount({ node , DOMPosition , getSiblings } : MountOptions){

        parent = node

        position = DOMPosition

        getSiblingsCallback = getSiblings

        update(typeof content !== 'string' && content.isStream ? content.value : content)
    }
    
    function update(data?: any){

        if(data === undefined) return

        element_list.forEach(el => el.remove())
        
        virtual.innerHTML = data

        const children = Array.from(virtual.children)

        element_list = children as Element[]

        element_list.forEach((el ,i) => mountElement(el , i))
    }

    function mountElement(element: Element , index: number){

        const position = getMountedSiblings() + index
            
        const position_occupied = parent.children[position]
        
        position_occupied ? parent.insertBefore(element , position_occupied) : parent.insertAdjacentElement('beforeend' , element)
    }

    function getMountedSiblings(){

        if(!getSiblingsCallback) return 0

        const previous_siblings = getSiblingsCallback(0 , position)
        
        const mountedSiblings: Element[] = []

        previous_siblings.forEach(sibling => sibling.collectMountedElements(mountedSiblings))
        
        return mountedSiblings.length
    }
    
    function destroy(){
        
        if(typeof content !== 'string' && content.isStream) content.removeFromWatchList(HtmlFragment.id)
    }
    
    function init(){
        
        if(typeof content !== 'string' && content.isStream) content.addToWatchList(HtmlFragment)
    }

    return HtmlFragment
}