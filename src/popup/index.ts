import { mount } from "svelte";
import App from "./app.svelte";

const container = document.getElementById("app") as HTMLElement | null;
if (container) {
  mount(App, { target: container });
}

export {};
