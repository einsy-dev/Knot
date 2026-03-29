export function delay<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  let time: number = Date.now() + wait;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    let newWait = Date.now() - time;

    if (newWait <= 0) {
      time = Date.now();
      newWait = wait;
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, newWait);
  };
}
