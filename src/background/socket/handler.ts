import { SocketAction, SocketActionData } from "$types/socket";
import { SocketClient } from ".";

export function socketHandler(this: SocketClient) {
  this.socket!.addEventListener("message", (event) => {
    const { action, data }: { action: SocketAction; data: SocketActionData } = JSON.parse(event.data);
    let cb = this.callbacks[action];
    if (!cb.length) return;

    for (let c of cb) {
      c(data);
    }
  });
}
