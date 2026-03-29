import { SocketClient } from "../background/socket";

interface SocketMessageI {
  action: SocketActionI;
  event: SocketEventI;
}

export interface SocketActionI {
  connect: {
    id: string;
  };
  tab: {
    get: {
      tabId: number;
    };
    getAll: number[];
    create: {
      url: string;
      active: boolean;
    };
    update: {
      tabId: number;
      url: string;
      active: boolean;
    };
    close: {
      tabId: number;
    };
  };
  close: {
    data: CloseEvent;
  };
}

interface SocketEventI {
  id: string;
  data?: TabInfo | TabInfo[];
  status?: TabInfo;
  ping?: string;
}

export type SocketAction = keyof SocketActionI;
export type SocketActionData = Partial<SocketActionI>;
export type SocketCallback<K extends SocketAction> = { (data: SocketActionData[K], socket: SocketClient): void };

export interface TabInfo {
  tabId: number;
  title: string;
  url: string;
  status: "unloaded" | "loading" | "complete";
  active: boolean;
}

export type SocketEvent = Partial<SocketEventI>;
