import { SocketAction, SocketActionData } from "$types/socket";
import { SocketClient } from ".";

export function handler(this: SocketClient) {
  this.socket!.addEventListener("message", (event) => {
    const data: SocketActionData = JSON.parse(event.data);

    for (let action in data) {
      let cb = this.callbacks[action];
      if (!cb.length) return;

      for (let c of cb) {
        c(data[action as SocketAction], this);
      }
    }
  });

  this.socket?.addEventListener("close", (event) => {
    let cb = this.callbacks["close"];
    if (!cb.length) return;
    for (let c of cb) {
      c(event, this);
    }
  });
}
