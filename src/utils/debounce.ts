export function debounce<T extends (...args: any[]) => any>(
  func: T | T[],
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (Array.isArray(func)) {
        func.forEach((f) => f.apply(this, args));
        return;
      }
      func.apply(this, args);
    }, wait);
  };
}
