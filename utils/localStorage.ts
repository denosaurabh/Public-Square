export class LocalStore<T extends Object = string> {
  readonly key: string;

  constructor(key: string, public def?: T) {
    this.key = key;
  }

  get(): T | undefined {
    const val = window.localStorage.getItem(this.key);

    if (val === null) {
      return this.def;
    }

    try {
      return JSON.parse(val);
    } catch (err) {
      console.error(err);
    }

    return;
  }

  set(val: T | undefined) {
    val
      ? window.localStorage.setItem(this.key, JSON.stringify(val))
      : window.localStorage.removeItem(this.key);
  }

  update(val: Partial<T> | undefined) {
    val
      ? window.localStorage.setItem(
          this.key,
          JSON.stringify({ ...this.get(), ...val })
        )
      : window.localStorage.removeItem(this.key);
  }

  add(val: T) {
    this.set(Object.assign(this.get() || {}, val));
  }

  del() {
    window.localStorage.removeItem(this.key);
  }
}
