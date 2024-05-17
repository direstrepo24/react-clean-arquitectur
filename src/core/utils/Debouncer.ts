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

class DebounceUtil {
    private debounce:any
    private static instance: DebounceUtil;
    //Assign "new Singleton()" here to avoid lazy initialisation
    constructor() {
        if (DebounceUtil.instance) {
            return DebounceUtil.instance;
        }
        DebounceUtil.instance = this;
    }

    $debounce(callback: (...args: unknown[]) => void, ms: number = 700) {
        clearTimeout(this.debounce)
          this.debounce = setTimeout(() => {
            callback()
        }, ms)
    }
}
export const debounceUtil =new  DebounceUtil();

//otra impentacion

type DebouncedFunction<A = unknown, R = void> = (args: A) => Promise<R>;

export function debounce<A, R>(
  fn: (args: A) => R,
  delay: number
): DebouncedFunction<A, R> {
  let timer: NodeJS.Timeout;
  return (args: A) => {
    return new Promise<R>((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        resolve(fn(args));
      }, delay);
    });
  };
}