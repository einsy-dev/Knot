interface SocketMessageI {
  action: SocketActionI;
  event: SocketEventI;
}

export interface SocketActionI {
  connect: {
    id: string;
  };
  tab: {
    get: {};
    getAll: {};
    open: {};
    update: {};
    close: {};
  };
}

interface SocketEventI {
  status: {
    id: string;
    tab: TabInfo;
  };
}

export type SocketAction = keyof SocketActionI;
export type SocketActionData = Partial<SocketActionI>;
export type SocketCallback<K extends SocketAction> = { (data: SocketActionData[K]): void };

export interface TabInfo {
  tabId: number;
  url: string;
  status: "unloaded" | "loading" | "complete";
  active: boolean;
}

export type SocketEvent = Partial<SocketEventI>;
