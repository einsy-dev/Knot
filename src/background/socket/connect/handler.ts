import { SocketClient } from "..";
import { SocketAction } from "../types";

export function handler(this: SocketClient) {
  this.socket?.addEventListener("message", (event) => {
    const data: SocketAction = JSON.parse(event.data);

    for (let action in data) {
      let cb = this.callbacks[action];
      if (!cb.length) return;

      for (let c of cb) {
        c(data[action as keyof SocketAction], this);
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
