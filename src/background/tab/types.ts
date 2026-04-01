export interface TabEvent {
  active: chrome.tabs.OnActivatedInfo;
  update: TabInfo;
}

export type TabEventCallback<T extends keyof TabEvent> = {
  (event: TabEvent[T]): void;
};

export type Callback = (tabId: number, tabInfo?: TabInfo) => void;

export interface TabInfo {
  tabId: number;
  title: string;
  url: string;
  status: "unloaded" | "loading" | "complete";
  active: boolean;
}
