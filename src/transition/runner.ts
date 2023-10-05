import { TransitionFunction } from "../interfaces";



export function run_entry_transition(node: Element , factory: TransitionFunction){
    

    return new Promise(res => {
        const { from , to , delay = 0 , duration = 1000 } = factory(node)
    
        node.animate([ from , to ] , {
            fill: 'backwards',
            easing: 'ease-out',
            delay,
            duration
        }).onfinish = res
    })
}

export function run_exit_transition(node: Element , factory: TransitionFunction){
    
    return new Promise(res => {

        const { to , exit = {} , delay = 0 , duration = 1000 } = factory(node)
        
        node.animate([ to , exit ] , {
            fill: 'backwards',
            easing: 'ease-out',
            delay,
            duration
        }).onfinish = res
    })
}


