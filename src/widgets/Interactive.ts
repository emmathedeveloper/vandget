import { Widget } from "../core";
import { InteractiveConfig } from "../interfaces";



export default function Interactive(config?: InteractiveConfig){

    const init: any = {
        tag: config?.type || 'div',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: {  },
        attributes: {  },
        events: {  },
        children: [ config?.child ]
    } 

    if(config?.className) init.props.className = config.className
    
    if(config?.id) init.props.id = config.id

    for(const event in config){
        if(event.startsWith('on') && typeof config[event] === 'function') init.events[event] = config[event]
    }

    return Widget(init)
}


