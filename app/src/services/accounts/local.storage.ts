export class LocaStorage<T> {
  constructor(private key: string) {}

  get() {
    const initialData = localStorage.getItem(this.key);
    if (!initialData) return null;
    return JSON.parse(initialData) as T;
  }

  set(data: T) {
    const finalData = JSON.stringify(data);
    localStorage.setItem(this.key, finalData);
  }

  remove() {
    localStorage.removeItem(this.key);
  }
}
