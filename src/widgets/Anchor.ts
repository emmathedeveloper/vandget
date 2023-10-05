import { Widget } from "../core";
import { AnchorConfig } from "../interfaces";


export default function Anchor(config?: AnchorConfig){

    const init: any = {
        tag: 'a',
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
    
    if(config?.href) init.props.href = config.href
    
    if(config?.target) init.props.target = config.target

    return Widget(init)
}