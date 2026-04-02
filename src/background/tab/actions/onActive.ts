import { TabClient } from "..";

export function onActive(this: TabClient) {
  const handleActive = (activeInfo: chrome.tabs.OnActivatedInfo) => {
    this.callbacks["active"].forEach((cb) => {
      cb(activeInfo);
    });
  };

  return {
    listen() {
      chrome.tabs.onActivated.addListener(handleActive);
    },
    close() {
      chrome.tabs.onActivated.removeListener(handleActive);
    }
  };
}
