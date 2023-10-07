import { VanStream } from "../interfaces"



export function isValidValueForEachFragment(values: any[] | VanStream<any[]>){

    if(!Array.isArray(values) && values.isStream && !Array.isArray(values.value)) return false

    if(!Array.isArray(values) && !values.isStream) return false

    return true
}

export function isValidValueForHtmlFragment(content: string | VanStream<string>){

    if(typeof content !== 'string' && content.isStream && typeof content.value !== 'string') return false

    if(typeof content !== 'string' && !content.isStream) return false

    return true
}

export function streamsToListenToAreValid(streams: VanStream<any>[]){

    const allIsStream = streams.every(stream => stream.isStream)

    if(!allIsStream) throw new Error('A value you provided to the listen list of a StatefulWidget is not a valid stream')

    return true
}

export function urlIsValid(url: string){
    if(typeof url !== 'string') throw new Error('')
}



