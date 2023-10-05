import { Widget } from "../core";
import { TextConfig, Updater } from "../interfaces";



export default function Text(text: Updater<string>, config?: TextConfig){

    const init: any = {
        tag: config?.type || 'p',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: { textContent: text },
        attributes: {  }
    }

    if(config?.className) init.props.className = config.className
    
    if(config?.id) init.props.id = config.id

    return Widget(init)
}


