<script lang="ts">
  import "virtual:windi.css";
  import "@ubeac/svelte/styles/tabler.css";
  import ModalProvider from "$lib/modal/ModalProvider.svelte";
</script>

<slot />

<ModalProvider />
