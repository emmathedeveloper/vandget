

export function processObject(object: any){

    if(!object) return {}

    const processed: any = {}

    for(const property in object){
        if(typeof object[property] === 'function'){
           processed[property] = object[property]() 
        }else{
            processed[property] = object[property]
        }
    }

    return processed
}

export function compareObjects(old_object: any , new_object: any){

    const updated_object: any = {}

    for(const prop in new_object){

        if(old_object[prop] !== new_object[prop]) updated_object[prop] = new_object[prop]
    }

    return updated_object
}

export function addEvents(events: any , element: Element){

    if(!events) return

    for(const event in events){

        if(typeof events[event] !== 'function') continue

        const name = event.toLowerCase().replace('on' , '')

        element.addEventListener(name , events[event])
    }
}

export function transformToMap<T>(array: T[]){

    const map: Map<number , T> = new Map()

    array.forEach((v , i) => {

        map.set(i , v)
    })

    return map
}

export function transformMapToArray<T>(map: Map<number , T>){

    const array: T[] = []

    map.forEach((v , i) => {

        array.push(v)
    })

    return array
}

export function reference<T>(value: T) : T{

    return JSON.parse(JSON.stringify(value))
}

export function getParams(to: string , path: string){

    let obj: any = {}

    let dynamicParams = path.split('/').filter(s => s.trim().length).map((param , index) => {
        if(param.startsWith(':')) return { isParam: true, param: param.replace(':' , '') , index }

        return { isParam: false }
    }).filter(res => res.isParam === true)

    dynamicParams.forEach(param => {
        obj[param.param!] = to.split('/').filter(s => s.trim().length)[param.index!]
    })

    return obj
}

export function urlIsMatch(to: string , path: string){

    //if(to === path) return { isMatch: true , to , path , params: {} }

    function sameLength(){

        return to.split('/').filter(s => s.trim().length).length === path.split('/').filter(s => s.trim().length).length
    }

    function staticParamsMatch(){

        let obj: any = {}

        let pathStaticParams = path.split('/').filter(s => s.trim().length).map((param , index) => {
            if(!param.startsWith(':')) return { isParam: true, param , index }

            return { isParam: false }
        }).filter(res => res.isParam === true)

        pathStaticParams.forEach(param => {
            obj[param.index!] = param.param
        })

        return pathStaticParams.every(param => to.split('/').filter(s => s.trim().length)[param.index!] === param.param)
    }

    if(!sameLength()) return { isMatch: false , to , path , params: {} }

    if(!staticParamsMatch()) return { isMatch: false , to , path , params: {} }

    return { isMatch: true , to , path , params: getParams(to , path) }
}



