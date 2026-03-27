declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

type SocketAction = "connect" | "create" | "update" | "close" | "getTab" | "getTabList";
type SocketActionData = { [key: string]: any };
type SocketActionCallback = (data: SocketActionData) => void;

type SocketEvent = "update" | "getTab" | "getTabList";

interface SendMessage {
  event: SocketEvent;
  data: { [key: string]: any };
}
