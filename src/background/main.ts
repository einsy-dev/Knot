import { Socket } from "./socket";

async function main() {
  Socket.addAction("connect", () => {
    console.log("connect");
  });

  chrome.runtime.onMessage.addListener((m, s, r) => {
    if (m == "reload") {
      Socket.reload();
    }
  });
}

main();
