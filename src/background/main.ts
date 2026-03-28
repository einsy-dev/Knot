import { Socket } from "./socket";

async function main() {
  Socket.addAction("connect", (data) => {
    console.log("connect");
  });

  chrome.runtime.onMessage.addListener((m, s, r) => {
    if (m == "reload") {
      Socket.reload();
    }
  });
}

main();
