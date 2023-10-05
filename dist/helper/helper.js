"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlIsMatch = exports.getParams = exports.reference = exports.transformMapToArray = exports.transformToMap = exports.addEvents = exports.compareObjects = exports.processObject = void 0;
function processObject(object) {
    if (!object)
        return {};
    const processed = {};
    for (const property in object) {
        if (typeof object[property] === 'function') {
            processed[property] = object[property]();
        }
        else {
            processed[property] = object[property];
        }
    }
    return processed;
}
exports.processObject = processObject;
function compareObjects(old_object, new_object) {
    const updated_object = {};
    for (const prop in new_object) {
        if (old_object[prop] !== new_object[prop])
            updated_object[prop] = new_object[prop];
    }
    return updated_object;
}
exports.compareObjects = compareObjects;
function addEvents(events, element) {
    if (!events)
        return;
    for (const event in events) {
        if (typeof events[event] !== 'function')
            continue;
        const name = event.toLowerCase().replace('on', '');
        element.addEventListener(name, events[event]);
    }
}
exports.addEvents = addEvents;
function transformToMap(array) {
    const map = new Map();
    array.forEach((v, i) => {
        map.set(i, v);
    });
    return map;
}
exports.transformToMap = transformToMap;
function transformMapToArray(map) {
    const array = [];
    map.forEach((v, i) => {
        array.push(v);
    });
    return array;
}
exports.transformMapToArray = transformMapToArray;
function reference(value) {
    return JSON.parse(JSON.stringify(value));
}
exports.reference = reference;
function getParams(to, path) {
    let obj = {};
    let dynamicParams = path.split('/').filter(s => s.trim().length).map((param, index) => {
        if (param.startsWith(':'))
            return { isParam: true, param: param.replace(':', ''), index };
        return { isParam: false };
    }).filter(res => res.isParam === true);
    dynamicParams.forEach(param => {
        obj[param.param] = to.split('/').filter(s => s.trim().length)[param.index];
    });
    return obj;
}
exports.getParams = getParams;
function urlIsMatch(to, path) {
    //if(to === path) return { isMatch: true , to , path , params: {} }
    function sameLength() {
        return to.split('/').filter(s => s.trim().length).length === path.split('/').filter(s => s.trim().length).length;
    }
    function staticParamsMatch() {
        let obj = {};
        let pathStaticParams = path.split('/').filter(s => s.trim().length).map((param, index) => {
            if (!param.startsWith(':'))
                return { isParam: true, param, index };
            return { isParam: false };
        }).filter(res => res.isParam === true);
        pathStaticParams.forEach(param => {
            obj[param.index] = param.param;
        });
        return pathStaticParams.every(param => to.split('/').filter(s => s.trim().length)[param.index] === param.param);
    }
    if (!sameLength())
        return { isMatch: false, to, path, params: {} };
    if (!staticParamsMatch())
        return { isMatch: false, to, path, params: {} };
    return { isMatch: true, to, path, params: getParams(to, path) };
}
exports.urlIsMatch = urlIsMatch;
//# sourceMappingURL=helper.js.map