import { setIconStatus } from "./chrome/icon";
import { Tabs } from "./chrome/tab";
import { Socket } from "./socket";

async function main() {
  let tabUpdate: { listen: () => void; close: () => void };
  setIconStatus("red");

  Socket.addAction("connect", (data, socket) => {
    socket.id = data?.id;

    tabUpdate = Tabs.onUpdate((tabId, changeInfo, tab) => {
      socket.send({ status: Tabs.getTabData(tab) });
    });
    tabUpdate.listen();
    setIconStatus("#00FF00");
  });

  Socket.addAction("close", () => {
    setIconStatus("red");
    tabUpdate?.close();
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
