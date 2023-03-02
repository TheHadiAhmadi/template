<script lang="ts">
  import Modal from "$lib/modal/Modal.svelte";
  import { Button, DialogBody, El } from "@ubeac/svelte";
  import { modal } from "$lib/modal/store";

  export let description: string = "Are you sure you want to remove this item?";
  export let title: string = "Confirm remove";
</script>

<Modal {title}>
  <El tag="h2" slot="body">{description}</El>

  <El class="btn-list" slot="footer">
    <Button on:click={() => $modal.resolve(false)}>No</Button>
    <Button on:click={() => $modal.resolve(true)}>Yes</Button>
  </El>
</Modal>
