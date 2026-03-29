import { debounce } from "$utils/debounce";
import { Tab } from "./tab";

export function tabUpdate(
  this: Tab,
  callback: (tabId: number, changeInfo: chrome.tabs.OnUpdatedInfo, tab: chrome.tabs.Tab) => void
) {
  let laodingCallback = debounce(callback, 100);
  let completeCallback = debounce(callback, 100);

  const onUpdate = (tabId: number, changeInfo: chrome.tabs.OnUpdatedInfo, tab: chrome.tabs.Tab) => {
    if (tab.status == "loading") {
      laodingCallback(tabId, changeInfo, tab);
    } else if (tab.status == "complete") {
      completeCallback(tabId, changeInfo, tab);
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
