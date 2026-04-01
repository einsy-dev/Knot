import { compare } from "$utils/compare";
import { debounce } from "$utils/debounce";
import { TabClient } from ".";
import { Callback, TabInfo } from "./types";

export function onUpdate(this: TabClient) {
  let state: {
    [tabId: number]: {
      cb: Callback;
      sent: Partial<TabInfo>;
    };
  } = {};

  const onUpdate = (tabId: number, changeInfo: chrome.tabs.OnUpdatedInfo, tab: chrome.tabs.Tab) => {
    if (!state[tabId] && tab.status != "complete") {
      state[tabId] = { cb: debounce(this.callbacks["update"], 100), sent: {} };
    }

    let tabInfo = this.getTabData(tab);
    if (!tabInfo) return;

    if (compare(state[tabId].sent, tabInfo)) {
      state[tabId].sent = tabInfo;
      state[tabId].cb(tabId, tabInfo);
    }

    if (tab.status == "complete") {
      delete state[tabId];
    }
  };

  return {
    listen: () => {
      chrome.tabs.onUpdated.addListener(onUpdate);
    },
    close: () => {
      chrome.tabs.onUpdated.removeListener(onUpdate);
    }
  };
}
