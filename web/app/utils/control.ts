export function repeatNode<T>(len: number, callback: (index: number) => T): T[] {
  return [...Array(len).keys()].map(callback);
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(() => resolve(undefined), ms));
}
