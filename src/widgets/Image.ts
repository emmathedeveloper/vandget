import { Widget } from "../core";
import { ImageConfig } from "../interfaces";



export default function Image(config?: ImageConfig){

    const init: any = {
        tag: 'img',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: {  },
        attributes: {  }
    }

    if(config?.className) init.props.className = config?.className
    
    if(config?.id) init.props.id = config?.id
    
    if(config?.src) init.props.src = config?.src
    
    if(config?.height) init.attributes.height = config?.height
    
    if(config?.width) init.attributes.width = config?.width

    return Widget(init)
}


