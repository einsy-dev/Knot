import { AppCallback, AppAction } from "./types";

class AppClient {
  callbacks: { [action: string]: AppCallback<any>[] } = {};

  addAction<K extends keyof AppAction>(action: K, callback: AppCallback<K>) {
    if (!Array.isArray(this.callbacks[action])) {
      this.callbacks[action] = [];
    }
    this.callbacks[action].push(callback);
  }

  removeAction(action: string, callback: () => void) {
    this.callbacks[action] = this.callbacks[action].filter(
      (cb) => cb !== callback && cb.toString() !== callback.toString()
    );
  }
}

export const App = new AppClient();
