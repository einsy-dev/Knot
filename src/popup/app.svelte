<script lang="ts">
  import { onMount } from "svelte";
  import "../styles/global.css";

  let data = $state({ id: "", status: "" });

  function reloadSocket() {
    chrome.runtime.sendMessage("reload");
  }
</script>

<div
  class="relative aspect-video w-40 bg-main bg-cover bg-center bg-icon text-white flex flex-col overflow-hidden p-2 text-lg"
>
  <div class="bg-dark opacity-40 absolute inset-0 z-1"></div>

  <button
    onclick={reloadSocket}
    class=" z-2 rounded bg-dark mx-auto w-4/5 border mt-auto cursor-pointer hover:scale-103"
  >
    Reload
  </button>
</div>
