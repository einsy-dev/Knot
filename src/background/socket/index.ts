import { SocketAction, SocketCallback, SocketEvent } from "$types/socket";
import { socket } from "./connect";
import { handler } from "./handler";

export class SocketClient {
  id: string | undefined; // extension id
  url: string | undefined;
  socket: WebSocket | undefined;
  interval: string | number | NodeJS.Timeout | undefined;
  retry: number = 0;
  callbacks: { [action: string]: SocketCallback<any>[] } = {};

  constructor(url: string = "ws://localhost:8081") {
    this.url = url;
    this.connect();
  }

  connect = socket.bind(this);
  handler = handler.bind(this);

  addAction<k extends SocketAction>(action: k, callback: SocketCallback<k>) {
    if (!Array.isArray(this.callbacks[action])) {
      this.callbacks[action] = [];
    }
    this.callbacks[action].push(callback);
  }

  removeAction<k extends SocketAction>(action: k, callback: SocketCallback<k>) {
    this.callbacks[action] = this.callbacks[action].filter((cb) => cb !== callback);
  }

  send(data?: SocketEvent) {
    if (!data) return;
    this.socket?.send(JSON.stringify(data));
  }

  reload(url?: string) {
    if (url) {
      this.url = url;
    }
    this.socket?.close();
    this.retry = 1;
    this.connect();
  }
}

export const Socket = new SocketClient();
