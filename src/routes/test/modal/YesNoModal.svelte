<script lang="ts">
  import Modal from "$lib/modal/Modal.svelte";
  import { modal } from "$lib/modal/store";
  import { Button } from "@ubeac/svelte";

  export let test: any;

  //   const modal = thisModal();
</script>

<Modal title="Yes or No?">
  Content + {test}

  <Button on:click={() => console.log($modal, modal)}>Log</Button>
  <Button on:click={$modal.close}>Close</Button>
  <Button on:click={() => $modal.resolve(true)}>Resolve</Button>
</Modal>
