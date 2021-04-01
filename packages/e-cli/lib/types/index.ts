export type GetKeys<T> = T extends Record<infer P, any> ? P:any;

export interface IConfig {
    templatePath:string
}

export interface IOutputConfig{
    apis:string
    routes:string
    pages:string
}
export interface IParams{
    moduleName:string
    templatePath:string
}

export interface IRenderFn{
    (str:string,moduleName:string):void
}
export interface IOutputFn{
    (str:string,data:string,moduleName:string):void
}
