import { Widget } from "../core";
import { ButtonConfig, Updater } from "../interfaces";



export default function Button(text: Updater<string>, config?: ButtonConfig){

    const init: any = {
        tag: 'button',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: { textContent: text },
        attributes: {  },
        events: { onClick: config?.onClick }
    }

    if(config?.className) init.props.className = config.className
    
    if(config?.id) init.props.id = config.id

    return Widget(init)
}