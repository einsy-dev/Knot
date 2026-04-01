import { SocketClient } from ".";
import { TabInfo } from "../tab/types";

export interface SocketAction {
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

export interface SocketEvent {
  id?: string;
  data?: TabInfo | TabInfo[];
  status?: TabInfo;
  ping?: string;
}

export type SocketCallback<K extends keyof SocketAction> = {
  (data: SocketAction[K], socket: SocketClient): void;
};
