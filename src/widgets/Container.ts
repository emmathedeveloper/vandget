import { Widget } from "../core";
import { ContainerConfig } from "../interfaces";



export default function Container(config?: ContainerConfig){

    const init: any = {
        tag: config?.type || 'div',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: {  },
        attributes: {  },
        children: config?.children
    }

    if(config?.className) init.props.className = config.className
    
    if(config?.id) init.props.id = config.id

    return Widget(init)
}


