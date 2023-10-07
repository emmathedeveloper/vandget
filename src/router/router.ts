import { urlIsMatch } from "../helper/helper";
import { DestroyOptions, MountOptions, VanWidget, PreviousSiblingsOrChildrenCallback, RouterParams } from "../interfaces";


export default function Router({ onRouteChange = () => {}, routes } : RouterParams) : VanWidget{

    let id = Math.floor(Math.random() * 1000000000).toString()

    let position: number | undefined

    let parent: Element

    let getSiblingsCallback: PreviousSiblingsOrChildrenCallback | undefined

    let currentWidget: VanWidget | undefined

    function init(){
        
        window.addEventListener('popstate' , run_route)

        window.addEventListener('DOMContentLoaded' , run_route)

        const win = window as any

        win.router = {
            navigate: run_route,
            params: {}
        }

        run_route()
    }

    function run_route(){

        let match = routes.map(route => urlIsMatch(location.pathname , route.path)).find(res => res.isMatch)

        currentWidget?.destroy()
        
        const win = window as any

        win.router.params = match?.params

        if(match){

            const found = routes.find(route => route.path === match?.path)

            currentWidget = found?.widget()
            
            currentWidget?.mount({ node: parent , DOMPosition: position , getSiblings: getSiblingsCallback })
            
            onRouteChange(match)
        }else if(!match){
            const found = routes.find(route => route.path === '*')

            currentWidget = found?.widget()
            
            currentWidget?.mount({ node: parent , DOMPosition: position , getSiblings: getSiblingsCallback })
        }

    }

    function mount({ node , DOMPosition , getSiblings }: MountOptions){

        position = DOMPosition

        parent = node

        getSiblingsCallback = getSiblings

        init()
    }

    function update(){

    }

    function destroy(options?: DestroyOptions){

                
        window.removeEventListener('popstate' , run_route)

        window.removeEventListener('DOMContentLoaded' , run_route)

        currentWidget?.destroy(options)
    }

    return {

        get id(){ return id },

        get isComponent(){ return false },

        get isMounted() { return true },

        collectMountedElements: (collected: Element[]) => {
            currentWidget?.collectMountedElements(collected)
        },

        mount,

        update,

        destroy
    }
}