export abstract class Dep {
    /**
     * 依赖安装
     * @param args 
     */
    abstract install(...args:string[]):void
    /**
     * 依赖初始化
     * @param args 
     */
    abstract initialize(...args:string[]):void
    /**
     * run
     */
     abstract run(...args:string[]):void
} 

