export class Debounce<T, Result = void>{
    private timer: NodeJS.Timeout | null = null;
    constructor(private delayMs: number){}
 
    execute(args: T, fn:(args: T) => Result){
        if(this.timer){
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(()=> {
           fn(args)
        }, this.delayMs)
    }
 
    cancel(){
        if(this.timer){
            clearTimeout(this.timer)
            this.timer = null;
        }
    }
}