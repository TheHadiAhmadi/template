<script lang="ts">
  import Modal from "$lib/modal/Modal.svelte";
  import { Button, DialogBody, El } from "@ubeac/svelte";

  export let description: string = "Are you sure you want to remove this item?";
  export let title: string = "Confirm remove user";
  export let onYes: any;
  export let onNo: any;
</script>

<Modal {title}>
  <El tag="h2" slot="body">{description}</El>

  <El class="btn-list" slot="footer">
    <Button on:click={onNo}>No</Button>
    <Button on:click={onYes}>Yes</Button>
  </El>
</Modal>
