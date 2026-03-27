<script lang="ts">
  import "../styles/global.css";
  // let edit = $state(false);
  // let value = $state("ws://localhost:8080");

  function reloadSocket() {
    chrome.runtime.sendMessage("reload");
  }

  let input: HTMLInputElement | undefined = $state();
</script>

<div class="w-50 h-20 bg-[#393a3a] text-white flex flex-col overflow-hidden p-2 text-lg">
  <div class="text-center">@knot</div>
  <!-- 
  <div class="">
    {#if edit}
      <label>
        <div class="">
          <span>Choose your socket url</span>
        </div>
        <input
          type="text"
          bind:value
          bind:this={input}
          onkeydown={(e: KeyboardEvent) => {
            e.key == "Enter" ? (edit = false) : null;
          }}
        />
      </label>
    {:else}
      <button
        onclick={() => {
          edit = true;
          setTimeout(() => {
            input?.select();
          }, 50);
        }}
      >
        <span>Socket url</span>
        <div class="">{value}</div>
      </button>
    {/if}
  </div> -->

  <button onclick={reloadSocket} class="rounded mx-auto w-4/5 border mt-auto cursor-pointer hover:scale-105">
    Reload
  </button>
</div>
