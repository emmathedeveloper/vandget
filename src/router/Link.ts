import { LinkWidget } from "../interfaces";
import { Interactive } from "../widgets";
import { navigate } from "./routehelpers";





export default function Link(linkConfig: LinkWidget){

    const config: any = {
        style: linkConfig.style,
    }

    if(linkConfig.className) config.className = linkConfig.className

    return Interactive({

        ...config,

        onClick: () => {

            if(linkConfig.to.startsWith('http')){
                window.open(linkConfig.to , "_blank")
            }else navigate.to(linkConfig.to , linkConfig.options)
        },

        child: linkConfig.child,
    })
}