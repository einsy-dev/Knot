export class Tab {
  async create({ url, active }: { url: string; active: boolean }): Promise<TabData | undefined> {
    return chrome.tabs
      .create({ url, active })
      .then(this.getTabData)
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  }

  async update(
    { tabId, url, active }: { tabId: number; url: string; active: boolean } = { tabId: 0, url: "", active: false }
  ): Promise<TabData | undefined> {
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

  private getTabData(tab?: chrome.tabs.Tab): TabData | undefined {
    if (!tab) return undefined;

    return {
      id: tab.id!,
      status: tab.status!,
      title: tab.title!,
      active: tab.active,
      url: tab.url!
    };
  }
}

interface TabData {
  id: number;
  title: string;
  status: string;
  active: boolean;
  url: string;
}

export type { TabData };
