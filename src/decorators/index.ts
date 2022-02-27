export function Frozen() {
  return function (ctor: Function) {
    Object.freeze(ctor);
    Object.freeze(ctor.prototype);
  };
}
