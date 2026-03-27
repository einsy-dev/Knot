import { socket } from "./connect";

export class SocketClient {
  id: string | undefined; // extension id
  url: string | undefined;
  socket: WebSocket | undefined;
  interval: string | number | NodeJS.Timeout | undefined;
  retry: number = 0;
  callbacks: { [action: string]: SocketActionCallback[] } = {};

  constructor(url: string = "ws://localhost:8081") {
    this.url = url;
    this.connect();
  }

  connect = socket.bind(this);

  addAction(action: SocketAction, callback: SocketActionCallback) {
    if (!Array.isArray(this.callbacks[action])) {
      this.callbacks[action] = [];
    }
    this.callbacks[action].push(callback);
  }

  removeAction(action: SocketAction, callback: SocketActionCallback) {
    this.callbacks[action] = this.callbacks[action].filter((cb) => cb !== callback);
  }

  send(message: SendMessage) {
    this.socket?.send(JSON.stringify(message));
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
