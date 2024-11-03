/**
 * Debounces a function, ensuring that it is only called after the specified wait time has elapsed since the last time it was invoked.
 *
 * @param func - The function to be debounced.
 * @param wait - The amount of time in milliseconds to wait before calling the function.
 * @returns A new function that, when invoked, will delay the execution of `func` until after `wait` milliseconds have elapsed.
 */
export const debounce = (func: (...args: any[]) => any | void, wait: number) =>
  function executedFunction(...args: any[]) {
    setTimeout(() => {
      func(...args);
    }, wait);
  };
