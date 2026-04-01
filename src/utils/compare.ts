export function compare(obj1: { [key: string]: any }, obj2: { [key: string]: any }): boolean {
  for (let key in obj2) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
