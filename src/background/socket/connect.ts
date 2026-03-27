import { SocketClient } from ".";

export function socket(this: SocketClient) {
  if (!this.url) return;
  this.socket = new WebSocket(this.url);
  this.socket.onopen = () => {
    this.retry = 0;
    this.interval = setInterval(() => {
      if (this.socket!.readyState === WebSocket.OPEN) {
        this.socket!.send(JSON.stringify({ event: "ping" }));
      }
    }, 15e3);
  };
  this.socket.onerror = () => {
    clearInterval(this.interval);
    if (this.retry < 3) {
      this.retry++;
      setTimeout(() => {
        this.connect();
      }, 1000);
    }
  };
}
