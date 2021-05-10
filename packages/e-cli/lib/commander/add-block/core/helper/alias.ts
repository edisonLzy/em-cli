export function isAliasPath(alias:Record<string, any>,source:string){
    const keys = Object.keys(alias);
    return keys.some(key=>{
        return source.startsWith(`${key}/`)
    })
}

// TODO 暂支持 @
export function transfromAlias(alias:Record<string, any>,source:string){     
    const value = alias['@'];
    return source.replace(`@`,value)
}