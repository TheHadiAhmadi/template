<script lang="ts">
  import { Button, El, Icon } from "@ubeac/svelte";

  export let offcanvasOpen: boolean = false;
  export let compactMode: boolean = false;
</script>

<El w="100" px="3" class="bg-white flex items-center h-14" borderBottom>
  <Button
    dMd="none"
    class="w-8 h-8"
    border="0"
    on:click={() => (offcanvasOpen = !offcanvasOpen)}
  >
    <Icon pack="material-symbols" name="menu" />
  </Button>
  <Button
    d="none"
    dMd="flex"
    class="w-8 h-8"
    border="0"
    on:click={() => (compactMode = !compactMode)}
  >
    {#if compactMode}
      <Icon pack="material-symbols" name="menu" />
    {:else}
      <Icon pack="material-symbols" name="menu-open" />
    {/if}
  </Button>
</El>
