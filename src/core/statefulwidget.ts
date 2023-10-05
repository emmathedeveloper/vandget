import { streamsToListenToAreValid } from "../helper/checks";
import { PlugStatefulWidget , DestroyOptions , MountOptions, PlugWidget } from "../interfaces";


/**
 * 
 * @description A Widget that can listen to streams and update it's UI accordingly when those streams change
 * 
 * @returns {PlugWidget}
 */
export default function StatefulWidget({ onBeforeMount , onMount , onDestroy , listen , body } : PlugStatefulWidget) : PlugWidget{
    
    const streams = listen

    const widget = {
        get id(){
            return body.id
        },
        get isComponent(){

            return true
        },
        get isMounted(){

            return body.isMounted
        },
        collectMountedElements: (collected: Element[]) => {
            
            body.collectMountedElements(collected)
        },
        mount,
        update,
        destroy
    }

    function mount({ node , DOMPosition , getSiblings , runEntryTransition } : MountOptions){

        if(!node) throw new Error('cannot mount widget on undefined node')

        if(!body) throw new Error('property "body" of Plugcomponent must be of type PlugWidget or PlugComponent')

        if(typeof onBeforeMount === 'function') onBeforeMount()

        body.mount({ node , DOMPosition , getSiblings , runEntryTransition })

        if(Array.isArray(streams) && streamsToListenToAreValid(streams)) streams.forEach(observable => observable.addToWatchList(widget))
        
        if(typeof onMount === 'function') onMount()
    }

    function update(){
        
        if(!body.isComponent){
            body.update()
        }else if(body.isComponent && body.allowStatePassThrough){
            body.update()
        }
    }
    
    function destroy(options?: DestroyOptions){

        body.destroy(options)
        
        if(typeof onDestroy === 'function') onDestroy()

        if(Array.isArray(streams) && streamsToListenToAreValid(streams)) streams.forEach(observable => observable.removeFromWatchList(widget.id))
    }

    return widget
}