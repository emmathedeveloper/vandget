import { TransitionFunction } from "../interfaces"

interface TransitionOptions{
    duration?: number,
    
    delay?: number
}

export function fade(options?: TransitionOptions) : TransitionFunction {

    let duration = options?.duration || 1000

    let delay = options?.duration || 0

    return (node?: Element) => {

        const style = getComputedStyle(node!)

        return {
            delay,
            duration,
            from: {
                opacity: 0
            },
            to: {
                opacity: style.opacity
            },
            exit:{
                opacity: 0
            }
        }
    }
}

interface SlideFadeOptions extends TransitionOptions{
    axis?: 'x' | 'y'
}

export function slidefade(options: SlideFadeOptions = { delay: 0 , duration: 1000 , axis: 'x' }) : TransitionFunction {


    let { delay , duration , axis } = options

    return (node?: Element) => {

        const style = getComputedStyle(node!)

        return {
            delay,
            duration,
            from: {
                transform: `${axis === 'x' ? 'translateX(-30px)' : 'translateY(-30px)'}`,
                opacity: 0
            },
            to: {
                transform: style.transform,
                opacity: style.opacity
            },
            exit:{
                transform: `${axis === 'x' ? 'translateX(-30px)' : 'translateY(-30px)'}`,
                opacity: 0
            }
        }
    }
}