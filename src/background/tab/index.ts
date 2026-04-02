import { onActive } from "./actions/onActive";
import { onUpdate } from "./actions/onUpdate";
import { TabEvent, TabEventCallback, TabInfo } from "./types";

export class TabClient {
  callbacks: { [action: string]: TabEventCallback<any>[] } = {};

  constructor() {
    this.onActive.listen();
    this.onUpdate.listen();
  }

  private onActive = onActive.bind(this)();
  private onUpdate = onUpdate.bind(this)();

  addAction<K extends keyof TabEvent>(action: K, callback: TabEventCallback<K>) {
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

  getTabData(tab: chrome.tabs.Tab): TabInfo {
    return {
      tabId: tab.id!,
      status: tab.status!,
      title: tab.title!,
      active: tab.active,
      url: tab.url!
    };
  }
}

export const Tab = new TabClient();
