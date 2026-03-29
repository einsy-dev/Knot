import { TabInfo } from "$types/socket";
import { tabUpdate } from "./tabUpdate";

export class Tab {
  onUpdate = tabUpdate.bind(this);

  async update(
    { tabId, url, active }: { tabId: number; url: string; active: boolean } = { tabId: 0, url: "", active: false }
  ): Promise<TabInfo | undefined> {
    return chrome.tabs
      .update(tabId, { url, active })
      .then(this.getTabData)
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  }

  async close(tabId: number): Promise<boolean | undefined> {
    return chrome.tabs
      .remove(tabId)
      .then(() => true)
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  }

  getTabData(tab?: chrome.tabs.Tab): TabInfo | undefined {
    if (!tab) return undefined;
    return {
      tabId: tab.id!,
      status: tab.status!,
      title: tab.title!,
      active: tab.active,
      url: tab.url!
    };
  }
}

export const Tabs = new Tab();
