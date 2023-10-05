import { NavigationOptions } from "../interfaces"



export function getUrlParams(){

    const win = window as any

    return win.router.params
}

const win = window as any

export const navigate = {

    to: (to: string , options?: NavigationOptions) => {

        if(to === location.pathname) return

        if(!win.router) return

        if(options && options.replace === true){
    
            history.replaceState({} , '' , to)
    
        } else history.pushState({} , '' , to)

        win.router.navigate()
    },

    back(){ history.back() },

    forward(){ history.forward() },
}