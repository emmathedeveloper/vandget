
import { Widget } from "../core";
import { Alertconfig, Updater } from "../interfaces";

//text: Updater<string>,
// so it can take a child of button and also has the events of click and cancel and I will also add the OnPop event

export default function Alert( config?:  Alertconfig, children?: any){

    const init: any = {
        tag: 'alert',
        ref: config?.ref,
        id: config?.id,
        style: config?.style,
        transition: config?.transition,
        props: {  },
        attributes: {  },
        events: {  }
    }

    if(config?.className) init.props.className = config.className
    
    if(config?.id) init.props.id = config.id

    if(typeof config?.onClick === 'function') init.events.onClick = config?.onClick

    if(typeof config?.onCancel === 'function') init.events.onCancel = config?.onCancel

    if(children) init.props.children = children

    return Widget(init)
}