import { setIconStatus } from "./chrome/icon";
import { Socket } from "./socket";
import { Tab } from "./tab";

async function main() {
  setIconStatus("red");

  Socket.addAction("connect", (data, socket) => {
    socket.id = data?.id;

    Tab.addAction("update", (tabInfo) => {
      socket.send({ id: socket.id, status: tabInfo });
    });

    setIconStatus("#00FF00");
  });

  Socket.addAction("close", () => {
    setIconStatus("red");
    // tabUpdate?.close();
  });

  Socket.addAction("tab", (data) => {
    if (!data) return;
    if (Object.hasOwn(data, "create")) {
      chrome.tabs.create({ url: data.create.url, active: data.create.active });
    }
  });

  chrome.runtime.onMessage.addListener((m, s, r) => {
    if (m == "reload") {
      Socket.reload();
    }
  });
}

main();
